namespace BuddyGoals.DTOs
{
    public class UserProfileDto
    {
        public Guid UserId { get; set; }
        public string? UserName { get; set; }
        public string? Email { get; set; }
        public string? ProfilePicUrl { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Bio { get; set; }
        public DateOnly? DOB { get; set; }
        public string? Country { get; set; }
        public string? CountryCode { get; set; }
        public string? PhoneNo { get; set; }
        public string? Gender { get; set; }
        public int FriendCount { get; set; } = 0;
        public int MutualCount { get; set; } = 0;
        public Enums.FriendshipStatus? Status { get; set; }
        public Guid? RequestId { get; set; }
    }
}
