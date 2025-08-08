namespace API.Entities;

using System.ComponentModel.DataAnnotations;

public class AppCustomer
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public required string DisplayName { get; set; }

    public required string Email { get; set; }
}
