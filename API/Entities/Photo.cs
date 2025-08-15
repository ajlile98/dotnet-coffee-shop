using System;
using System.Text.Json.Serialization;

namespace API.Entities;

public class Photo
{
    public int Id { get; set; }
    public required string Url { get; set; }
    public string? PublicId { get; set; }

    // // Navigation Property
    // [JsonIgnore]
    // public Customer Customer { get; set; } = null!;
    // public string CustomerId { get; set; } = null!;
}
