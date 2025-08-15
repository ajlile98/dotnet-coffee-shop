using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(IUserRepository userRepository) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetUsers()
        {
            return Ok(await userRepository.GetUsersAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await userRepository.GetUserByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            return user;
        }

        // [HttpGet("{id}/photos")]
        // public async Task<ActionResult<IReadOnlyList<Photo>>> GetMemberPhotos(string id)
        // {
        //     return Ok(await userRepository.GetPhotosForUserAsync(id));
        // }
    }
}
