using BuddyGoals.DTOs;

namespace BuddyGoals.Services.IServices
{
    public interface IMasterService
    {
        Task<List<CountryDto>> GetCountryList(string searchTerm);
    }
}
