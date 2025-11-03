namespace BuddyGoals.DTOs
{
    public class UpdateUserProfileDto
    {
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Bio { get; set; }
        public DateOnly? DOB { get; set; }
        public string? Gender { get; set; }
        public string? PhoneNo { get;set; }
        public string? Country { get; set; }
    }
}
