using System;
using API.Entities;

namespace API.DTOs;

public class OrderCreationDto
{
    public required string UserId { get; set; }
    public required List<OrderItemDto> OrderItems { get; set; }
}

public class OrderItemDto
{
    public required string MenuItemId { get; set; }
    public int Quantity { get; set; }
}
