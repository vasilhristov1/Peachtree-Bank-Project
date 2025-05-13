namespace peachtree_bank_backend.Data.Models.DTOs;

public record TransactionCreateModel
{
    public required string ContractorTo { get; set; }
    public required string ContractorFrom { get; set; }
    public decimal Amount { get; set; }
}