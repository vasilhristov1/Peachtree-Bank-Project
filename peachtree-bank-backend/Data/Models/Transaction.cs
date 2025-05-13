using System.ComponentModel.DataAnnotations;
using peachtree_bank_backend.Data.Models.Enums;

namespace peachtree_bank_backend.Models;

public class Transaction : ModelBase
{

    [Required]
    public string ContractorTo { get; set; } = string.Empty;

    [Required]
    public string ContractorFrom { get; set; } = string.Empty;

    [Required]
    public decimal Amount { get; set; }

    public TransactionStatus Status { get; set; } = TransactionStatus.Sent;
}