using System;
using System.Collections.Generic;
using API.Extensions;

namespace API.Entities;

public class Order
{
    public int Id { get; set; }
    public required List<OrderItem> OrderItems { get; set; } = [];
    public required DateTime Created { get; set; }
    public DateTime? Completed { get; set; }
    public required OrderStatus Status { get; set; } = OrderStatus.Pending;
    public int UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public decimal TotalAmount { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public Order Order { get; set; } = null!;
    public required string MenuItemId { get; set; }
    public MenuItem MenuItem { get; set; } = null!;
    public int Quantity { get; set; }
    public decimal PriceAtTime { get; set; } // Store price at time of order in case menu prices change
}

public enum OrderStatus
{
    Pending,
    Confirmed,
    Preparing,
    Ready,
    Completed,
    Cancelled
}