using System;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(User user);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<User>> GetUsersAsync();
    Task<User?> GetUserByIdAsync(string id);
    // Task<IReadOnlyList<Photo>> GetPhotosForUserAsync(string userId);
}
