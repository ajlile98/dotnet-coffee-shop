using System;
using System.Collections.Generic;

namespace API.Entities;

public class Order
{
    public int Id { get; set; }
    public required List<MenuItem> MenuItems { get; set; } = [];
    public required DateTime Created { get; set; }
    public required DateTime Completed { get; set; }
    public required string Status { get; set; }
}
