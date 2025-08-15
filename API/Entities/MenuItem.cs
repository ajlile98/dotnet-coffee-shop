using System;
using System.ComponentModel.DataAnnotations;

namespace API.Entities;

public class MenuItem
{
    [Key]
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public required string Name { get; set; }
    public required decimal Price { get; set; }
    public Photo? ItemPhoto { get; set; }

}
