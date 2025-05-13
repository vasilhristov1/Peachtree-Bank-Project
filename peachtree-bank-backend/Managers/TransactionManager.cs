using peachtree_bank_backend.Data.Models.Enums;
using peachtree_bank_backend.Data.Repositories.Abstractions;
using peachtree_bank_backend.Data.ViewModels;
using peachtree_bank_backend.Managers.Abstractions;
using peachtree_bank_backend.Models;

namespace peachtree_bank_backend.Managers;

public class TransactionManager(ITransactionRepository transactionRepository) : ITransactionManager
{
    private readonly ITransactionRepository _transactionRepository = transactionRepository;

    public async Task AddAsync(Transaction transaction)
    {
        await _transactionRepository.AddAsync(transaction);
    }

    public async Task<Transaction> GetAsync(int id)
    {
        return await _transactionRepository.GetAsync(id);
    }

    public async Task<PaginatedResponse<Transaction, TransactionPaginationMetadata>> GetAllAsync(TransactionQuery  queryParams)
    {
        return await _transactionRepository.GetAllAsync(queryParams);
    }

    public async Task<Transaction> UpdateAsync(int id, TransactionStatus status)
    {
        return await _transactionRepository.UpdateAsync(id, status);
    }
    
    public async Task DeleteAsync(int id)
    {
        await _transactionRepository.DeleteAsync(id);
    }
}