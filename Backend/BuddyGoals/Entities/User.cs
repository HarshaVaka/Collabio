namespace BuddyGoals.Entities
{
    public class User
    {
        public Guid UserId { get; set; }
        public required string UserName { get; set; }
        public required string Email { get; set; }
        public required string HashedPassowrd { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; }
        public DateTime ModifiedAt { get; set; }
        public string? ModifiedBy { get; set; }
        //Navigation
        public ICollection<UserRoleMapping> UserRoles { get; set; } = [];
        public ICollection<RefreshToken> RefreshTokens { get; set; } = [];
        public required UserProfile Profile { get; set; }
    }
}
