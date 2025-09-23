using System;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class Seed
{
    public static async Task SeedUsers(UserManager<AppUser> userManager)
    {
        if (await userManager.Users.AnyAsync()) return;

        var customerData = await File.ReadAllTextAsync("Data/UserSeedData.json");
        var customers = JsonSerializer.Deserialize<List<SeedUserDto>>(customerData);

        if (customers == null)
        {
            Console.WriteLine("No members in seed data");
            return;
        }


        foreach (var customer in customers)
        {
            var user = new AppUser
            {
                Id = customer.Id,
                Email = customer.Email,
                UserName = customer.Email,
                DisplayName = customer.DisplayName,
                ImageUrl = customer.ImageUrl,
                // Customer = new Customer
                // {
                //     Id = customer.Id,
                //     DisplayName = customer.DisplayName,
                //     Description = customer.Description,
                //     DateOfBirth = customer.DateOfBirth,
                //     ImageUrl = customer.ImageUrl,
                //     Gender = customer.Gender,
                //     City = customer.City,
                //     Country = customer.Country,
                //     LastActive = customer.LastActive,
                //     Created = customer.Created
                // }
            };
            // user.Customer.Photos.Add(new Photo
            // {
            //     Url = customer.ImageUrl!,
            //     CustomerId = customer.Id,
            // });

            var result = await userManager.CreateAsync(user, "Pa$$w0rd");
            if (!result.Succeeded)
            {
                Console.WriteLine(result.Errors.First().Description);
            }
            await userManager.AddToRoleAsync(user, "Customer");
        }

        var admin = new AppUser
        {
            UserName = "admin@test.com",
            Email = "admin@test.com",
            DisplayName = "admin"
        };

        await userManager.CreateAsync(admin, "Pa$$w0rd");
        await userManager.AddToRolesAsync(admin, ["Admin", "Employee"]);

    }

    public static async Task SeedMenuItems(AppDbContext context)
    {
        if (await context.MenuItems.AnyAsync()) return;

        var menuItemData = await File.ReadAllTextAsync("Data/MenuItemSeed.json");
        var menuItems = JsonSerializer.Deserialize<List<SeedMenuItemDto>>(menuItemData);

        if (menuItems == null)
        {
            Console.WriteLine("No menu items in seed data");
            return;
        }

        foreach (var menuItemDto in menuItems)
        {
            var menuItem = new MenuItem
            {
                Id = menuItemDto.Id,
                Name = menuItemDto.Name,
                Price = menuItemDto.Price
            };

            context.MenuItems.Add(menuItem);
        }

        await context.SaveChangesAsync();
    }
}
