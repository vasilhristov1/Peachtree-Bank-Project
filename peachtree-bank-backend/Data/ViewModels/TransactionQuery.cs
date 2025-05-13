namespace peachtree_bank_backend.Data.ViewModels;

public record TransactionQuery(
    string? SortDirection,
    string? SortBy,
    string? SearchTerm,
    int Page = 1,
    int PageSize = 10
);
