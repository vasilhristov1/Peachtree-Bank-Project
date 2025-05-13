using peachtree_bank_backend.Data.Models.Enums;
using peachtree_bank_backend.Data.ViewModels;
using peachtree_bank_backend.Models;

namespace peachtree_bank_backend.Data.Repositories.Abstractions;

public interface ITransactionRepository
{
    Task AddAsync(Transaction transaction);
    Task<Transaction> GetAsync(int id);
    Task<PaginatedResponse<Transaction, TransactionPaginationMetadata>> GetAllAsync(TransactionQuery  queryParams);
    Task<Transaction> UpdateAsync(int id, TransactionStatus status);
    Task DeleteAsync(int id);
}