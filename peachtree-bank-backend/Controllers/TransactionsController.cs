using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using peachtree_bank_backend.Data.Models.DTOs;
using peachtree_bank_backend.Data.Models.Enums;
using peachtree_bank_backend.Data.ViewModels;
using peachtree_bank_backend.Managers.Abstractions;
using Transaction = peachtree_bank_backend.Models.Transaction;

namespace peachtree_bank_backend.Controllers;

using TransactionsResponse = PaginatedResponse<TransactionResult, TransactionPaginationMetadata>;

[ApiController]
[Route("transactions")]
[Authorize]
public class TransactionsController(ITransactionManager transactionManager, IMapper mapper) : ControllerBase
{
    private readonly ITransactionManager _transactionManager = transactionManager;
    private readonly IMapper _mapper = mapper;

    [HttpGet]
    public async Task<IActionResult> GetAll([FromQuery] TransactionQuery  queryParams)
    {
        return Ok(_mapper.Map<TransactionsResponse>(await _transactionManager.GetAllAsync(queryParams)));
    }

    [HttpGet("{id:int}")]
    public async Task<IActionResult> GetById([FromRoute] int id)
    {
        return Ok(_mapper.Map<TransactionResult>(await _transactionManager.GetAsync(id)));
    }

    [HttpPost]
    public async Task<IActionResult> AddTransaction([FromBody] TransactionCreateModel transaction)
    {
        await _transactionManager.AddAsync(_mapper.Map<Transaction>(transaction));
        
        return Ok();
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> UpdateStatus([FromRoute] int id, [FromBody] TransactionStatus status)
    {
        return Ok(_mapper.Map<TransactionResult>(await _transactionManager.UpdateAsync(id, status)));
    }
    
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteTransaction([FromRoute] int id)
    {
        await _transactionManager.DeleteAsync(id);
        
        return Ok();
    }
    
}