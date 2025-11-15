namespace BuddyGoals.Enums
{
    public enum FriendshipStatus
    {
        NoFriends = 0,        // No connection at all
        Pending = 1,          // You sent a request (waiting for other person to accept)
        AwaitingApproval = 2, // You received a request (you can accept/reject)
        AlreadyFriends = 3    // Both are friends
    }
}
