using BuddyGoals.DTOs;
using BuddyGoals.Entities;

namespace BuddyGoals.Repositories.IRepositories
{
    public interface IFriendRepo
    {
        Task<int> AddFriend(FriendRequest friendReqDetails);
        Task<List<PendingRequestsDto>> GetPendingFriendRequests(Guid userId);
        Task<User> GetUserFromRequestId(Guid requestId);
        Task<int> UpdateApproveRejectRequest(ApproveRejectRequestDto requestData);
        Task<int> CheckFriendRequestStatus(FriendRequestDto friendRequestData, Guid userId);
        Task<List<FriendListDto>> GetFriendsList(Guid userId);
    }
}
