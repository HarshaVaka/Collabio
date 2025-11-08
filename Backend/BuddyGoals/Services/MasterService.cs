using BuddyGoals.DTOs;
using BuddyGoals.Repositories.IRepositories;
using BuddyGoals.Services.IServices;

namespace BuddyGoals.Services
{
    public class MasterService(IMasterRepo masterRepo): IMasterService
    {
        private readonly IMasterRepo _masterRepo = masterRepo;

        public async Task <List<CountryDto>> GetCountryList(string searchTerm)
        {
            return await _masterRepo.GetCountryList(searchTerm);

        }

    }
}
