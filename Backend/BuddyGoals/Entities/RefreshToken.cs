using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuddyGoals.Entities
{
    public class RefreshToken
    {
        [Key]
        public int RefreshTokenId { get; set; }
        [Required]
        [MaxLength(200)]
        public string Token { get; set; } = string.Empty;
        [Required]
        public DateTime ExpiresAt { get; set; }
        
        [NotMapped]
        public bool IsExpired => DateTime.UtcNow >= ExpiresAt;
        public DateTime CreatedAt { get; set; }
        public string CreatedByIp { get; set; } = string.Empty;
        public DateTime? Revoked { get; set; }
        public string? RevokedByIp { get; set; }
        public string? ReplacedByToken { get; set; }

        [NotMapped]
        public bool IsActive => Revoked == null && !IsExpired;

        // Foreign key to User
        [Required]
        public Guid UserId { get; set; }
        public User User { get; set; } = null!;
    }
}