using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class MenuItemsController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<MenuItem>>> GetMenuItems()
        {
            var menuItems = await context.MenuItems.ToListAsync();

            return menuItems;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<MenuItem>> GetMenuItem(string id)
        {
            var menuitem = await context.MenuItems.FindAsync(id);

            if (menuitem == null) return NotFound();

            return menuitem;

        }

        [HttpPost]
        public async Task<ActionResult<MenuItem>> CreateMenuItem(MenuItemCreationDto menuItemDto)
        {
            var menuItem = new MenuItem
            {
                Name = menuItemDto.Name,
                Price = menuItemDto.Price
            };

            context.MenuItems.Add(menuItem);
            await context.SaveChangesAsync();

            return menuItem;
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MenuItem>> DeleteMenuItem(string id)
        {
            var menuItem = await GetMenuItem(id);
            if (menuItem == null) return NotFound();
            await context.MenuItems.ExecuteDeleteAsync();
            return menuItem;
        }
    }
}
