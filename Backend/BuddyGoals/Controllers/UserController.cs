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
        [Route("profile/{userName}")]
        public async Task<IActionResult> GetUserProfile([FromRoute]string userName)
        {
            var userNameFromToken = User.FindFirstValue(ClaimTypes.Name) ?? "";
            _logger.LogInformation("Fetching profile of user: {UserName}",userName);
            var result = await _userService.GetUserProfileDetails(userName,userNameFromToken);
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
            var _ = await _userService.UpdateUserProfileDetails(Guid.Parse(userId), patchDoc);
            return Ok("Profile updated successfully!!");
        }

        [HttpGet]
        [Authorize]
        [Route("UsersListBySearchTerm")]
        public async Task<IActionResult> GetUsersListBySearchTerm([FromQuery] string searchTerm)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            _logger.LogInformation("Fetching list of users with search term {searchFriendParam} by user {userName}", searchTerm, userName);
            var friendList = await _userService.GetUsersListBySearchTerm(Guid.Parse(userId), searchTerm);

            return Ok(friendList);

        }
    }
}
