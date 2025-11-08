using BuddyGoals.DTOs;

namespace BuddyGoals.Repositories.IRepositories
{
    public interface IMasterRepo
    {
        Task<List<CountryDto>> GetCountryList(string searchTerm);
    }
}
