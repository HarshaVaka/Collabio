using BuddyGoals.DTOs;
using BuddyGoals.Services.IServices;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace BuddyGoals.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FriendController(ILogger<AuthController> logger, IFriendService friendService) : ControllerBase
    {
        private readonly IFriendService _friendService = friendService;
        private readonly ILogger<AuthController> _logger = logger;


        [HttpPost]
        [Authorize]
        [Route("Friend")]
        public async Task<IActionResult> AddFriend([FromBody] FriendRequestDto friendRequestData)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)??"";
            _logger.LogInformation("Sending friend request by {userName}", userName);
            var result = await _friendService.AddFriend(friendRequestData, Guid.Parse(userId));
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("PendingFriendRequests")]
        public async Task<IActionResult> GetPendingFriendRequests([FromQuery] Guid userId)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            _logger.LogInformation("Fetching the list of Pending requests for {userName}", userName);
            var result = await _friendService.GetPendingFriendRequests(userId);
            return Ok(result);
        }

        [HttpPatch]
        [Authorize]
        [Route("ApproveRejectRequest")]
        public async Task<IActionResult> UpdateApproveRejectRequest([FromBody] ApproveRejectRequestDto requestData)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            _logger.LogInformation("Updating Friend Request of {userName}", userName);
            var result = await _friendService.UpdateApproveRejectRequest(Guid.Parse(userId), requestData);
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("FriendsList")]
        public async Task<IActionResult> GetFriendsList([FromQuery] Guid userId)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            _logger.LogInformation("Fetchng friends list of {userName}", userName);
            var result = _friendService.GetFriendsList(userId);
            return Ok(result);
        }

    }
}
