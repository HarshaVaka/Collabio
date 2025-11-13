using BuddyGoals.Enums;

namespace BuddyGoals.DTOs
{
    public class PendingRequestsDto
    {
        public required Guid RequestId { set; get; }
        public required Guid SenderId { get; set; }
        public required string SenderUserName { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? ImageUrl { get; set; }
    }
}
