using System;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

/// <summary>
/// User repository interface for managing user data operations.
/// </summary>
/// <remarks>
/// <strong>DEPRECATED:</strong> This interface is deprecated and will be removed in version 2.0.0.
/// <para>
/// All user management functionality has been migrated to use ASP.NET Core Identity's 
/// <see cref="Microsoft.AspNetCore.Identity.UserManager{TUser}"/>.
/// </para>
/// <para>
/// Migration completed: October 2024
/// Scheduled removal: Version 2.0.0
/// </para>
/// </remarks>
[Obsolete("UserRepository is deprecated. Use UserManager<AppUser> from ASP.NET Core Identity instead.", error: true)]
public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task<AppUser?> GetUserByIdAsync(string id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<IReadOnlyList<AppUser>> GetUsersAsync()
    {
        return await context.Users.ToListAsync();
    }

    // public async Task<IReadOnlyList<Photo>> GetPhotosForAppUserAsync(string userId)
    // {
    //     return await context.Users
    //         .Where(x => x.Id == userId)
    //         // .SelectMany(x => x.Photos)
    //         .ToListAsync();
    // }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser AppUser)
    {
        context.Entry(AppUser).State = EntityState.Modified;
    }
}
