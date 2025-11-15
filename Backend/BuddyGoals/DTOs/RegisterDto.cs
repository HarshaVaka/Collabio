namespace BuddyGoals.DTOs
{
    public class RegisterDto
    {
        public string? Username { get; set; }
        public required string Password { get; set; }
        public string? Email { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
    }
}
