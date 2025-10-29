namespace BuddyGoals.Entities
{
    public class UserProfile
    {
        public Guid ProfileId { get; set; }
        public Guid UserId { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? PhoneNo { get; set; }
        public string? CountryCode { get; set; }
        public string? Gender { get; set; }
        public string? Bio { get; set; }
        public DateOnly? DOB { get; set; }
        public string? ProfileUrl { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string? ModifiedBy { get; set; }

        public User? User { get; set; }
    }
}
