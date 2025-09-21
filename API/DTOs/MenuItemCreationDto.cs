using System;

namespace API.DTOs;

public class MenuItemCreationDto
{
    public required string Name { get; set; }
    public required decimal Price { get; set; }
}
