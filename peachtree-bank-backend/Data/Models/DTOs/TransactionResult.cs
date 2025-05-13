using peachtree_bank_backend.Data.Models.Enums;

namespace peachtree_bank_backend.Data.Models.DTOs;

public record TransactionResult
{
    public int Id { get; init; }
    public required string ContractorTo { get; init; }
    public required string ContractorFrom { get; init; }
    public decimal Amount { get; init; }
    public TransactionStatus Status { get; init; }
    public DateOnly CreatedDateTime { get; set; }
}