
using BuddyGoals.DTOs;
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BuddyGoals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController(ILogger<AuthController> logger, IUserService userService) : ControllerBase
    {
        private readonly ILogger<AuthController> _logger = logger;
        private readonly IUserService _userService = userService;

        [HttpGet]
        [Authorize()]
        [Route("me")]
        public async Task<IActionResult> GetUserDetails()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            _logger.LogInformation("Fetching details of user: {UserName}",userName);
            var result = await _userService.GetUserDetails(userName);
            return Ok(result);
        }

        [HttpGet]
        [Authorize()]
        [Route("profile")]
        public async Task<IActionResult> GetUserProfile()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            _logger.LogInformation("Fetching profile of user: {UserName}",userName);
            var result = await _userService.GetUserProfileDetails(userName);
            return Ok(result);
        }

        [HttpPatch]
        [Authorize()]
        [Route("profile")]
        public async Task<IActionResult> UpdateUserProfile([FromBody] JsonPatchDocument<UpdateUserProfileDto> patchDoc)
        {
            if (patchDoc == null)
                return BadRequest("Invalid patch document");

            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            _logger.LogInformation("Updating profile of user: {UserId}", userId);
            var result = await _userService.UpdateUserProfileDetails(Guid.Parse(userId), patchDoc);
            return Ok(result);
        }
    }
}
