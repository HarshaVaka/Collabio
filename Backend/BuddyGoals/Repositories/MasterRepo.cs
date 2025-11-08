using BuddyGoals.Data;
using BuddyGoals.DTOs;
using BuddyGoals.Repositories.IRepositories;
using Microsoft.EntityFrameworkCore;

namespace BuddyGoals.Repositories
{
    public class MasterRepo(BuddyGoalsDbContext dbContext) : IMasterRepo
    {
        private readonly BuddyGoalsDbContext _dbContext = dbContext;

        public async Task<List<CountryDto>> GetCountryList(string searchTerm) {
            var countryList = await _dbContext.Countries.Where(c => c.CountryName.Contains(searchTerm))
                .Select(c => new CountryDto() {
                    CountryCode = c.CountryCode,
                    CountryName = c.CountryName
                }).ToListAsync();
            return countryList;
        
        }
    }
}
