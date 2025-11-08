using System.ComponentModel.DataAnnotations.Schema;

namespace BuddyGoals.Entities
{
    public class Friend
    {
        public int Id { get; set; }

        [ForeignKey(nameof(User))]
        public Guid UserId { get; set; }
        public required User User { get; set; }

        [ForeignKey(nameof(FriendUser))]
        public Guid FriendId { get; set; }
        public required User FriendUser { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }

}
