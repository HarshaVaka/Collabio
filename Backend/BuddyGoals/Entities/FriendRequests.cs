using BuddyGoals.Enums;
using System.ComponentModel.DataAnnotations.Schema;

namespace BuddyGoals.Entities
{
    public class FriendRequest
    {
        public Guid RequestId { get;set; }
        [ForeignKey(nameof(Sender))]
        public Guid SenderId { get;set; }
        public User? Sender { get;set; }

        [ForeignKey(nameof(Receiver))]
        public Guid ReceiverId { get; set; }
        public User? Receiver { get; set; }

        public FriendRequestStatus? Status { get;set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? ModifiedAt { get; set; }
    }
}
