using System;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(string id);
    // Task<IReadOnlyList<Photo>> GetPhotosForUserAsync(string userId);
}
