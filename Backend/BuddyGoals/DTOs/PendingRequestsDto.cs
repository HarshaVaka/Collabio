using BuddyGoals.Enums;

namespace BuddyGoals.DTOs
{
    public class PendingRequestsDto
    {
        public required string Receiver { get; set; }
        public required FriendRequestStatus? Status { get; set; } 
    }
}
