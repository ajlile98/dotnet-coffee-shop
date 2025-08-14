using System;
using API.Entities;

namespace API.Interfaces;

public interface ICustomerRepository
{
    void Update(Customer customer);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<Customer>> GetCustomersAsync();
    Task<Customer?> GetCustomerByIdAsync(string id);
    Task<IReadOnlyList<Photo>> GetPhotosForCustomerAsync(string customerId);
}
