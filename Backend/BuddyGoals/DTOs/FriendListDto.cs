namespace BuddyGoals.DTOs
{
    public class SearchUserDto
    {
        public required string UserName { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public  string? ImageUrl {  get; set; }
        public int MutualCount { get; set; }
    }

   public class FriendDataDto
    {
        public required string UserName { get; set; }
        public required string FirstName { get; set; }
        public required string LastName { get; set; }
        public string? ImageUrl { get; set; }
    }
}
