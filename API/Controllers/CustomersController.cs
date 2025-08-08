using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public async Task<ActionResult<IReadOnlyList<AppCustomer>>> GetCustomers()
        {
            var customers = await context.Customers.ToListAsync();

            return customers;
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AppCustomer>> GetCustomer(string id)
        {
            var customer = await context.Customers.FindAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }
    }
}
