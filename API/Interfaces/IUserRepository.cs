using System;
using API.Entities;

namespace API.Interfaces;

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
public interface IUserRepository
{
    void Update(AppUser user);
    Task<bool> SaveAllAsync();
    Task<IReadOnlyList<AppUser>> GetUsersAsync();
    Task<AppUser?> GetUserByIdAsync(string id);
    // Task<IReadOnlyList<Photo>> GetPhotosForUserAsync(string userId);
}
