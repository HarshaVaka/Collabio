using AutoMapper;
using BuddyGoals.DTOs;
using BuddyGoals.Entities;
using BuddyGoals.Exceptions;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services.IServices;

namespace BuddyGoals.Services
{
    public class FriendService(IFriendRepo friendSearchRepo, IMapper mapper): IFriendService
    {
        private readonly IFriendRepo _friendRepo = friendSearchRepo;
        private readonly IMapper _mapper = mapper;

       
        public async Task<int> AddFriend(FriendRequestDto friendRequestData, Guid userId)
        {
            var isValidrequest = await _friendRepo.CheckFriendRequestStatus(friendRequestData, userId);
            if(isValidrequest == 1)
            {
                throw new ApiException("The user you are trying to add friend is already in your friend list", StatusCodes.Status302Found);
            }
            else if(isValidrequest == 0)
            {
                throw new ApiException("You have already sent friend request for this user", StatusCodes.Status302Found);
            }
            var friendReqDetails = _mapper.Map<FriendRequest>(friendRequestData);
            friendReqDetails.Status = (Enums.FriendRequestStatus?)1;
            friendReqDetails.CreatedAt = DateTime.UtcNow;
            friendReqDetails.RequestId = Guid.NewGuid(); 
            return await _friendRepo.AddFriend(friendReqDetails);
        }

        public async Task<List<PendingRequestsDto>> GetPendingFriendRequests(Guid userId)
        {
            return await _friendRepo.GetPendingFriendRequests(userId);
        }

        public async Task<int> UpdateApproveRejectRequest(Guid userId, ApproveRejectRequestDto requestData)
        {
            var user = await _friendRepo.GetUserFromRequestId(requestData.RequestId);
            if(user == null || user.UserId != userId)
            {
                throw new ApiException("Invalid user", StatusCodes.Status401Unauthorized);

            }
            return await _friendRepo.UpdateApproveRejectRequest(requestData);
        }

        public async Task<List<FriendListDto>> GetFriendsList(Guid userId)
        {
            return await _friendRepo.GetFriendsList(userId);
        }
    }
}
