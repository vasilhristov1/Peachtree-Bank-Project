using peachtree_bank_backend.Data.Models.Enums;

namespace peachtree_bank_backend.Data.ViewModels;

public record TransactionPaginationMetadata(
    IEnumerable<TransactionStatus> Statuses,
    int Page,
    int PageSize,
    int Count
);