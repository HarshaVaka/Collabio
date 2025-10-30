
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BuddyGoals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ILogger<AuthController> logger, IUserService userService, IHttpContextAccessor httpContextAccessor) : ControllerBase
    {
        private readonly ILogger<AuthController> _logger = logger;
        private readonly IHttpContextAccessor _httpContextAccessor = httpContextAccessor;
        private readonly IUserService _userService = userService;
        [HttpGet]
        [Authorize()]
        [Route("me")]
        public async Task<IActionResult> GetUserDetails()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name);
            _logger.LogInformation($"Fetching details of user: {userName}");
            var result = await _userService.GetUserDetails(userName);
            return Ok(result);
        }
    }
}
