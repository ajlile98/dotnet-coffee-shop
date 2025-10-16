using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class UsersController(UserManager<AppUser> userManager) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppUser>>> GetUsers()
        {
            return Ok(await userManager.Users.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(string id)
        {
            var user = await userManager.FindByIdAsync(id);
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
