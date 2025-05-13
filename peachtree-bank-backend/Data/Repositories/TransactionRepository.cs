using Microsoft.EntityFrameworkCore;
using peachtree_bank_backend.Data.Models.Enums;
using peachtree_bank_backend.Data.Repositories.Abstractions;
using peachtree_bank_backend.Data.ViewModels;
using peachtree_bank_backend.Models;

namespace peachtree_bank_backend.Data.Repositories;

public class TransactionRepository(MainContext context) : ITransactionRepository
{
    private readonly MainContext _context = context;
    
    public async Task AddAsync(Transaction transaction)
    {
        _context.Transactions.Add(transaction);
        
        await _context.SaveChangesAsync();
    }

    public async Task<Transaction> GetAsync(int id)
    {
        return await _context.Transactions.FindAsync(id);
    }
    
    public async Task<PaginatedResponse<Transaction, TransactionPaginationMetadata>> GetAllAsync(TransactionQuery queryParams)
    {
        var transactions = _context
            .Transactions;

        var filteredTransactions = 
            from transaction in transactions
            where
            (
                string.IsNullOrWhiteSpace(queryParams.SearchTerm)
                || transaction.ContractorTo.Contains(queryParams.SearchTerm)
                || transaction.ContractorFrom.Contains(queryParams.SearchTerm)
            )
            select transaction;
        
        var query = filteredTransactions
            .Sort(queryParams);
        
        var metadata = new TransactionPaginationMetadata(
            await transactions.Select(x => x.Status).Distinct().ToListAsync(),
            queryParams.Page,
            queryParams.PageSize,
            await query.CountAsync()
        );

        var items = await query
            .Skip((queryParams.Page - 1) * queryParams.PageSize)
            .Take(queryParams.PageSize)
            .ToListAsync();

        return new PaginatedResponse<Transaction, TransactionPaginationMetadata>(items, metadata);
    }

    public async Task<Transaction> UpdateAsync(int id, TransactionStatus status)
    {
        var transaction = await _context.Transactions.FindAsync(id);
        if (transaction == null) return null;

        transaction.Status = status;
        await _context.SaveChangesAsync();

        return transaction;
    }

    public async Task DeleteAsync(int id)
    {
        var transaction = await _context.Transactions.FindAsync(id);
        
        if (transaction == null) return;
        
        _context.Transactions.Remove(transaction);
        
        await _context.SaveChangesAsync();
    }
}