using BuddyGoals.DTOs;

namespace BuddyGoals.Services.IServices
{
    public interface IFriendService
    {
        Task<int> AddFriend(FriendRequestDto friendRequestData, Guid userId);
        Task<List<PendingRequestsDto>> GetPendingFriendRequests(Guid userId);
        Task<int> UpdateApproveRejectRequest(Guid userId, ApproveRejectRequestDto requestData);
        Task<List<FriendListDto>> GetFriendsList(Guid userId);
    }
}
