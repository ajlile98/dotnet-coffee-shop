using System.Security.Claims;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class OrderController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrders()
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;

            return await context.Orders
                .Where(o => o.UserId == userId)
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(o => o.MenuItem)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order?>> GetOrder(int id)
        {
            return await context.Orders
                .Include(o => o.User)
                .Include(o => o.OrderItems)
                    .ThenInclude(o => o.MenuItem)
                .FirstOrDefaultAsync(o => o.Id == id);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(OrderCreationDto orderDto)
        {
            var menuItemsIds = orderDto.OrderItems.Select(item => item.MenuItemId)
                .Distinct()
                .ToList();

            var menuItems = await context.MenuItems
                .Where(mi => menuItemsIds.Contains(mi.Id))
                .ToDictionaryAsync(mi => mi.Id, mi => mi);

            var orderItems = new List<OrderItem> { };
            foreach (var item in orderDto.OrderItems)
            {
                if (!menuItems.TryGetValue(item.MenuItemId, out var menuItem))
                {
                    return BadRequest($"Menu item with ID {item.MenuItemId} not found");
                }

                orderItems.Add(new()
                    {
                        MenuItemId = item.MenuItemId,
                        Quantity = item.Quantity,
                        PriceAtTime = menuItem.Price,
                    }
                );
            }

            var order = new Order
            {
                OrderItems = orderItems,
                UserId = orderDto.UserId,
            };

            context.Orders.Add(order);
            await context.SaveChangesAsync();
            return order;
        }
    }

}
