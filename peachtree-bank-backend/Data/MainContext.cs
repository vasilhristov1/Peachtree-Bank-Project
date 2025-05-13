using Microsoft.EntityFrameworkCore;
using peachtree_bank_backend.Models;

namespace peachtree_bank_backend.Data;

public class MainContext : DbContext
{
    public MainContext(DbContextOptions<MainContext> options) : base(options) {}

    public DbSet<User> Users { get; set; }
    public DbSet<Transaction> Transactions { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.HasDefaultSchema("PeachtreeBankApp");

        modelBuilder.Entity<User>().HasData(new User
        {
            Id = 1,
            Username = "admin",
            PasswordHash = "admin123",
            CreatedDateTime = new DateTime(2025, 5, 11),
        });

        var entities = modelBuilder
            .Model.GetEntityTypes()
            .Where(w => w.ClrType.IsSubclassOf(typeof(ModelBase)))
            .Select(p => modelBuilder.Entity(p.ClrType));

        foreach (var entity in entities)
        {
            entity.Property("CreatedDateTime").ValueGeneratedOnAdd();
        }

        base.OnModelCreating(modelBuilder);
    }
}