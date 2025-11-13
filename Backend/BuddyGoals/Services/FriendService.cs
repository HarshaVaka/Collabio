using BuddyGoals.Data;
using BuddyGoals.DTOs;
using BuddyGoals.Entities;
using BuddyGoals.Enums;
using BuddyGoals.Exceptions;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.JsonPatch;

namespace BuddyGoals.Services
{
    public class FriendService(IFriendRepo friendRepo,IUnitOfWork unitOfWork): IFriendService
    {
        private readonly IFriendRepo _friendRepo = friendRepo;
        private readonly IUnitOfWork _unitOfWork = unitOfWork;


        public async Task<int> AddFriend(FriendRequestDto friendRequestData, Guid userId)
        {
            var friendRequestStatus = await _friendRepo.GetFriendStatus(userId, friendRequestData.ReceiverId);
            if(friendRequestStatus != null)
            {
                if (friendRequestStatus == FriendRequestStatus.Accepted)
                {
                    throw new ApiException("The user you are trying to add friend is already in your friend list", StatusCodes.Status409Conflict);
                }
                else if (friendRequestStatus == FriendRequestStatus.Pending)
                {
                    throw new ApiException("You have already sent friend request for this user", StatusCodes.Status409Conflict);
                }
            }
            var friendReqDetails = new FriendRequest() {
                SenderId = userId,
                ReceiverId = friendRequestData.ReceiverId,
                RequestId = Guid.NewGuid(),
                CreatedAt = DateTime.UtcNow,
                Status = FriendRequestStatus.Pending
            };
            return await _friendRepo.AddFriend(friendReqDetails);
        }

        public async Task<List<PendingRequestsDto>> GetPendingFriendRequests(Guid userId)
        {
            return await _friendRepo.GetPendingFriendRequests(userId);
        }

        public async Task<int> UpdateApproveRejectRequest(Guid userId,Guid requestId, JsonPatchDocument<ApproveRejectRequestDto> patchDoc)
        {
            if(patchDoc == null)
            {
                throw new ApiException("Invalid Body", StatusCodes.Status400BadRequest);
            }
            var friendRequestData = await _friendRepo.GetFriendRequestDataFromRequestId(requestId) ?? throw new ApiException("Invalid RequestId", StatusCodes.Status404NotFound);
            if (friendRequestData.ReceiverId != userId)
            {
                throw new ApiException("Invalid user", StatusCodes.Status401Unauthorized);
            }
            if(friendRequestData.Status != FriendRequestStatus.Pending)
            {
                throw new ApiException("Only pending requests can be processed", StatusCodes.Status403Forbidden);
            }

            var dto = new ApproveRejectRequestDto
            {
                Status = (FriendRequestStatus)friendRequestData.Status
            };

            patchDoc.ApplyTo(dto);

            if (dto.Status != FriendRequestStatus.Accepted &&
                dto.Status != FriendRequestStatus.Rejected)
            {
                throw new ApiException("Invalid status value", StatusCodes.Status400BadRequest);
            }

            friendRequestData.Status = dto.Status;
            friendRequestData.ModifiedAt = DateTime.UtcNow;

            await _unitOfWork.ExecuteInTransactionAsync(async () =>
            {
                //  Update the friend request status
                await _friendRepo.UpdateFriendRequestStatus(friendRequestData);

                //  If accepted, create friendship
                if (dto.Status == FriendRequestStatus.Accepted)
                {
                    await _friendRepo.CreateFriendship(friendRequestData.SenderId, friendRequestData.ReceiverId);
                }
            });
            return 1;
        }

        public async Task<List<FriendDataDto>> GetFriendsList(Guid userId)
        {
            return await _friendRepo.GetFriendsList(userId);
        }
    }
}
