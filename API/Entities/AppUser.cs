namespace API.Entities;

using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

public class AppUser
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string DisplayName { get; set; }

    public required string Email { get; set; }

    public string? ImageUrl { get; set; }

    [JsonIgnore]
    public byte[] PasswordHash { get; set; } = [];
    [JsonIgnore]

    public byte[] PasswordSalt { get; set; } = [];

    // public Customer Customer { get; set; } = null!;
}
