using BuddyGoals.DTOs;
using BuddyGoals.Entities;

namespace BuddyGoals.Repositories.IRepositories
{
    public interface IFriendRepo
    {
        Task<int> AddFriend(FriendRequest friendReqDetails);
        Task<List<PendingRequestsDto>> GetPendingFriendRequests(Guid userId);
        Task<FriendRequest?> GetFriendRequestDataFromRequestId(Guid requestId);
        Task<Enums.FriendRequestStatus?> GetFriendStatus(Guid senderId,Guid RecieverId);
        Task<List<FriendDataDto>> GetFriendsList(Guid userId);
        Task CreateFriendship(Guid userId, Guid friendId);
        Task UpdateFriendRequestStatus(FriendRequest request);
    }
}
