using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using API.Extensions;

namespace API.Entities;

public class Order
{
    public int Id { get; set; }
    public List<OrderItem> OrderItems { get; set; } = [];
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime? Completed { get; set; }
    public OrderStatus Status { get; set; } = OrderStatus.Pending;
    public required string UserId { get; set; }
    public AppUser User { get; set; } = null!;
    public decimal TotalAmount
    {
        get
        {
            return OrderItems?.Sum(item => item.PriceAtTime * item.Quantity) ?? 0;
        }
    }
}

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    [JsonIgnore]
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