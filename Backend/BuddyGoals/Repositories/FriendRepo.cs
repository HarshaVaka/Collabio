using BuddyGoals.Data;
using BuddyGoals.DTOs;
using BuddyGoals.Entities;
using BuddyGoals.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BuddyGoals.Repositories
{
    public class FriendRepo(BuddyGoalsDbContext dbContext) : IFriendRepo
    {
        private readonly BuddyGoalsDbContext _dbContext = dbContext;


        
        public async Task<int> AddFriend(FriendRequest friendRequestDetails)
        {
            await _dbContext.FriendRequests.AddAsync(friendRequestDetails);
            await _dbContext.SaveChangesAsync();
            return 1;
        }

        public async Task<List<PendingRequestsDto>> GetPendingFriendRequests( Guid userId)
        {
            var pendingRequestList = await _dbContext.FriendRequests
                                     .Include(r => r.Sender)
                                     .ThenInclude(u => u.Profile)
                                     .Where(r => r.ReceiverId == userId && r.Status==Enums.FriendRequestStatus.Pending)
                                     .Select(u => new PendingRequestsDto()
                                     {
                                         RequestId = u.RequestId,
                                         SenderId = u.SenderId,
                                         SenderUserName = u.Sender.UserName,
                                         FirstName = u.Sender.Profile.FirstName,
                                         LastName = u.Sender.Profile.LastName,
                                         ImageUrl = u.Sender.Profile.ProfileUrl
                                     }).ToListAsync();
            return pendingRequestList;

        }

        public async Task<FriendRequest?> GetFriendRequestDataFromRequestId(Guid requestId)
        {
            var friendRequestData = await _dbContext.FriendRequests
                .Where(r => r.RequestId == requestId)
                .FirstOrDefaultAsync();
            return friendRequestData;
        }

        public async Task UpdateFriendRequestStatus(FriendRequest request)
        {
            _dbContext.FriendRequests.Update(request);
            await _dbContext.SaveChangesAsync();
        }

        public async Task CreateFriendship(Guid userId, Guid friendId)
        {
            _dbContext.Friends.AddRange(
                new Friend { UserId = userId, FriendId = friendId },
                new Friend { UserId = friendId, FriendId = userId }
            );
            await _dbContext.SaveChangesAsync();
        }

        public async Task<Enums.FriendRequestStatus?> GetFriendStatus(Guid SenderId, Guid ReceiverId)
        {
            var requestStatus = await _dbContext.FriendRequests
                          .Include(u => u.Sender)
                          .Include(u => u.Receiver)
                          .Where(u => u.SenderId == SenderId && u.ReceiverId == ReceiverId)
                          .Select(u => u.Status).FirstOrDefaultAsync();

            return requestStatus;
        }

        public async Task<List<FriendDataDto>> GetFriendsList(Guid userId)
        {
            var friendList = await _dbContext.Friends
                .Where(f => f.UserId == userId)
                .Include(f => f.FriendUser)
                .ThenInclude(u => u.Profile)
                .Select(f => new FriendDataDto
                {
                    UserName = f.FriendUser.UserName,
                    FirstName = f.FriendUser.Profile.FirstName ?? "",
                    LastName = f.FriendUser.Profile.LastName ?? "",
                    ImageUrl = f.FriendUser.Profile.ProfileUrl ?? "Profile Pic"
                })
                .ToListAsync();

            return friendList;
        }
        public async Task<FriendshipDetailsDto> GetFriendshipDetails(string username, string userNameFromToken)
        {
            
            var userId = await _dbContext.Users.Where(u => u.UserName == username).Select(u => u.UserId).FirstOrDefaultAsync();
            var requesterUserId = await _dbContext.Users.Where(u => u.UserName == userNameFromToken).Select(u => u.UserId).FirstOrDefaultAsync();

            var myFriendIds = await _dbContext.Friends
                .Where(f => f.UserId == requesterUserId)
                .Select(f => f.FriendId)
                .ToListAsync();

            Enums.FriendshipStatus friendshipStatus = Enums.FriendshipStatus.NoFriends;
            Guid requestId = Guid.Empty;

            bool areFriends = await _dbContext.Friends
       .AnyAsync(f => f.UserId == requesterUserId && f.FriendId == userId);

            if (areFriends)
            {
                friendshipStatus = Enums.FriendshipStatus.AlreadyFriends; ;
            }
            else
            {
                // 2️ Check if a friend request exists
                var friendRequest = await _dbContext.FriendRequests
                    .Where(fr =>
                        (fr.SenderId == requesterUserId && fr.ReceiverId == userId) ||
                        (fr.SenderId == userId && fr.ReceiverId == requesterUserId))
                    .OrderByDescending(fr => fr.CreatedAt)
                    .FirstOrDefaultAsync();

                if (friendRequest != null)
                {
                    if (friendRequest.Status == Enums.FriendRequestStatus.Pending)
                    {
                        requestId = friendRequest.RequestId;
                        friendshipStatus = friendRequest.SenderId == requesterUserId
                            ? Enums.FriendshipStatus.Pending // I sent the request
                            : Enums.FriendshipStatus.AwaitingApproval;     // I need to approve
                    }
                }
            }


            var mutualCount =  await _dbContext.Friends.CountAsync(f => f.UserId == userId && myFriendIds.Contains(f.FriendId));

            return new FriendshipDetailsDto() {
                MutualCount = mutualCount,
                Status = friendshipStatus,
                RequestId = requestId
            };
        }

    }
}
