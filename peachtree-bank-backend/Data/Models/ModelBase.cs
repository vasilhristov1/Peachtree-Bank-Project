namespace peachtree_bank_backend.Models;

public abstract class ModelBase
{
    public int Id { get; set; }
    public DateTime CreatedDateTime { get; set; }
}