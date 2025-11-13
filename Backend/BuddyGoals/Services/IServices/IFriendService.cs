using BuddyGoals.DTOs;
using Microsoft.AspNetCore.JsonPatch;

namespace BuddyGoals.Services.IServices
{
    public interface IFriendService
    {
        Task<int> AddFriend(FriendRequestDto friendRequestData, Guid userId);
        Task<List<PendingRequestsDto>> GetPendingFriendRequests(Guid userId);
        Task<int> UpdateApproveRejectRequest(Guid userId,Guid requestId,JsonPatchDocument<ApproveRejectRequestDto> requestData);
        Task<List<FriendDataDto>> GetFriendsList(Guid userId);
    }
}
