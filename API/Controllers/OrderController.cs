using System.Runtime.CompilerServices;
using API.Data;
using API.Data.Migrations;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ActionConstraints;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class OrderController(AppDbContext context) : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<Order>>> GetOrders()
        {
            return await context.Orders
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
