using peachtree_bank_backend.Data.ViewModels;
using peachtree_bank_backend.Models;

namespace peachtree_bank_backend.Data;

public static class FiltersExtensions
{
    public static IQueryable<T> Sort<T>(this IQueryable<T> query, TransactionQuery queryParams) where T : Transaction
    {
        if (!string.IsNullOrEmpty(queryParams.SortBy))
        {
            query = (queryParams.SortBy, queryParams.SortDirection) switch
            {
                ("date", "asc") => query.OrderBy(x => x.CreatedDateTime),
                ("date", "desc") => query.OrderByDescending(x => x.CreatedDateTime),
                ("amount", "asc") => query.OrderBy(x => x.Amount),
                ("amount", "desc") => query.OrderByDescending(x => x.Amount),
                ("beneficiary", "asc") => query.OrderBy(x => x.ContractorTo),
                ("beneficiary", "desc") => query.OrderByDescending(x => x.ContractorTo),
            };
        }

        return query;
    }
}