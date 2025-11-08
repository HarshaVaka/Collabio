using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace BuddyGoals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MasterController(ILogger<AuthController> logger,  IMasterService masterService) : ControllerBase
    {
        private readonly IMasterService _masterService = masterService;
        private readonly ILogger<AuthController> _logger = logger;

        [HttpGet]
        [Route("CountryList")]
        public async Task <IActionResult> GetCountryList( [FromQuery]string searchTerm)
        {
            _logger.LogInformation("Fetching list of countries related to", searchTerm);
            var result = await masterService.GetCountryList(searchTerm);
            return Ok(result);
        }
        
    }
}
