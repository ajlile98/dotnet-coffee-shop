using System;
using System.Threading.Tasks;
using API.Entities;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository(AppDbContext context) : IUserRepository
{
    public async Task<User?> GetUserByIdAsync(string id)
    {
        return await context.Users.FindAsync(id);
    }

    public async Task<IReadOnlyList<User>> GetUsersAsync()
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

    public void Update(User AppUser)
    {
        context.Entry(AppUser).State = EntityState.Modified;
    }
}
