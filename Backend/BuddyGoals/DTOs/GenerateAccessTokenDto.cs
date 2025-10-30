namespace BuddyGoals.DTOs
{
    public class GenerateAccessTokenDto
    {
        public Guid UserId { get; set; }
        public string? UserName  { get; set; }
        public string[] Roles { get; set; } = [];

        public string? Email { get; set; }
    }
}
