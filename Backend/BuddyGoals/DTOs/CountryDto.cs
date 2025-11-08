using System.ComponentModel.DataAnnotations;

namespace BuddyGoals.DTOs
{
    public class CountryDto
    {
        
        public required string CountryCode { get; set; }
        public required string CountryName { get; set; }
        
    }
}
