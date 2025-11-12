namespace BuddyGoals.DTOs
{
    public class ApproveRejectRequestDto
    {
        public required Guid RequestId { get; set; }
        public required int Status { get;set; }
    }
}
