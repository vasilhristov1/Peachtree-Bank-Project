namespace peachtree_bank_backend.Data.Models.DTOs;

public record LoginRequest
{
    public required string Username { get; set; }
    public required string Password { get; set; }
}