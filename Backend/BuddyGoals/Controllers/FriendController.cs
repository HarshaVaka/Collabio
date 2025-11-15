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
    public class FriendController(ILogger<AuthController> logger, IFriendService friendService) : ControllerBase
    {
        private readonly IFriendService _friendService = friendService;
        private readonly ILogger<AuthController> _logger = logger;


        [HttpPost]
        [Authorize]
        public async Task<IActionResult> AddFriend([FromBody] FriendRequestDto friendRequestData)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)??"";
            _logger.LogInformation("Sending friend request by {userName} to {recieverId}", userName,friendRequestData.ReceiverUserName);
            var result = await _friendService.AddFriend(friendRequestData, Guid.Parse(userId));
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("PendingFriendRequests")]
        public async Task<IActionResult> GetPendingFriendRequests()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            _logger.LogInformation("Fetching the list of Pending requests for {userName}", userName);
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            var result = await _friendService.GetPendingFriendRequests(Guid.Parse(userId));
            return Ok(result);
        }

        [HttpPatch]
        [Authorize]
        [Route("updateFriendRequest/{requestId}")]
        public async Task<IActionResult> UpdateApproveRejectRequest([FromRoute]Guid requestId,[FromBody] JsonPatchDocument<ApproveRejectRequestDto> patchDoc)
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            _logger.LogInformation("Updating Friend Request of {userName}", userName);
            var result = await _friendService.UpdateApproveRejectRequest(Guid.Parse(userId),requestId, patchDoc);
            return Ok(result);
        }

        [HttpGet]
        [Authorize]
        [Route("FriendsList")]
        public async Task<IActionResult> GetFriendsList()
        {
            var userName = User.FindFirstValue(ClaimTypes.Name) ?? "";
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier) ?? "";
            _logger.LogInformation("Fetchng friends list of {userName}", userName);
            var result =await _friendService.GetFriendsList(Guid.Parse(userId));
            return Ok(result);
        }

    }
}
