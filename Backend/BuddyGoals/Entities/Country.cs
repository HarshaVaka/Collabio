namespace BuddyGoals.Entities
{
    public class Country
    {
        public string CountryCode { get; set; } = null!; // PK
        public string CountryName { get; set; } = null!;

        public ICollection<UserProfile> UserProfiles { get; set; } = [];
    }
}
