namespace BuddyGoals.Entities
{
    public class Role
    {
        public Guid RoleId { get; set; }
        public string RoleName { get; set; } = string.Empty;

        //Navigation Property 
        public ICollection<UserRoleMapping> UserRoles { get; set; } = [];
    }
}
