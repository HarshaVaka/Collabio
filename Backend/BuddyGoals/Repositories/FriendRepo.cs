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
                                     .Include(u => u.Receiver)
                                     .Where(r => r.ReceiverId == userId)
                                     .Select(u => new PendingRequestsDto()
                                     {
                                         Receiver = u.Receiver.UserName,
                                         Status = u.Status
                                     }).ToListAsync();
            return pendingRequestList;

        }

        public async Task<User> GetUserFromRequestId(Guid requestId)
        {
            var user = await _dbContext.FriendRequests
                .Include(u => u.Receiver)
                .Where(r => r.RequestId == requestId)
                .Select(u => u.Receiver).FirstOrDefaultAsync();
            return user;
        }

        public async Task<int> UpdateApproveRejectRequest(ApproveRejectRequestDto requestData)
        {
            var request = await _dbContext.FriendRequests
                          .FirstOrDefaultAsync(u => u.RequestId == requestData.RequestId);
            if(request != null)
            {
                request.Status = (Enums.FriendRequestStatus?)requestData.Status;
                _dbContext.SaveChangesAsync();
            }

            if(requestData.Status == 1)
            {
                var friend = new Friend
                {
                    UserId = request.ReceiverId,
                    User = request.Receiver,
                    FriendId = request.SenderId,
                    FriendUser = request.Sender,
                    CreatedAt = DateTime.UtcNow

                };
                await _dbContext.Friends.AddAsync(friend);
                _dbContext.SaveChangesAsync();

                var friend1 = new Friend
                {
                    UserId = request.SenderId,
                    User = request.Sender,
                    FriendId = request.ReceiverId,
                    FriendUser = request.Receiver,
                    CreatedAt = DateTime.UtcNow

                };
                await _dbContext.Friends.AddAsync(friend1);
                _dbContext.SaveChangesAsync();

                

            }
            return 1;

        }

        public async Task<int> CheckFriendRequestStatus(FriendRequestDto friendRequestData, Guid userId)
        {
            var requestStatus = await _dbContext.FriendRequests
                          .Include(u => u.Sender)
                          .Include(u => u.Receiver)
                          .Where(u => u.SenderId == userId && u.ReceiverId == friendRequestData.ReceiverId)
                          .Select(u => u.Status).FirstOrDefaultAsync();

            if(requestStatus!= null)
            {
                if((requestStatus == (Enums.FriendRequestStatus?)1))
                    {
                    return 1;
                }
                if(requestStatus == (Enums.FriendRequestStatus?)0){
                    return 0;
                }
                
            }
            return -1;
        }

        public async Task<List<FriendListDto>> GetFriendsList(Guid userId)
        {
            var friendList = await _dbContext.Friends
                            .Include(u=>u.User)
                            .ThenInclude(p => p.Profile)
                            .Where(u => u.UserId == userId)
                            .Select(u => new FriendListDto()
                            {
                                userName = u.User.UserName,
                                FirstName = u.User.Profile.FirstName,
                                LastName = u.User.Profile.LastName,
                                Bio = u.User.Profile.Bio
                            }).ToListAsync();
            return friendList;
        }

    }
}
