using System.ComponentModel;

namespace peachtree_bank_backend.Data.Models.Enums;

public enum TransactionStatus
{
    [Description("Sent")]
    Sent = 1,
    [Description("Received")]
    Received = 2,
    [Description("Payed")]
    Payed = 3,
}