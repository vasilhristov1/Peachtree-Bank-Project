namespace peachtree_bank_backend.Models;

public class User : ModelBase
{
    public string Username { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
}