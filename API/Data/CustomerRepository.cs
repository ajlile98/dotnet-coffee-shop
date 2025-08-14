using System;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class CustomerRepository(AppDbContext context) : ICustomerRepository
{
    public async Task<Customer?> GetCustomerByIdAsync(string id)
    {
        return await context.Customers.FindAsync(id);
    }

    public async Task<IReadOnlyList<Customer>> GetCustomersAsync()
    {
        return await context.Customers.ToListAsync();
    }

    public async Task<IReadOnlyList<Photo>> GetPhotosForCustomerAsync(string customerId)
    {
        return await context.Customers
            .Where(x => x.Id == customerId)
            .SelectMany(x => x.Photos)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(Customer customer)
    {
        context.Entry(customer).State = EntityState.Modified;
    }
}
