using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace peachtree_bank_backend.Migrations
{
    /// <inheritdoc />
    public partial class PropertyNamesChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                schema: "PeachtreeBankApp",
                table: "Transactions",
                newName: "ContractorTo");

            migrationBuilder.RenameColumn(
                name: "Contractor",
                schema: "PeachtreeBankApp",
                table: "Transactions",
                newName: "ContractorFrom");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ContractorTo",
                schema: "PeachtreeBankApp",
                table: "Transactions",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "ContractorFrom",
                schema: "PeachtreeBankApp",
                table: "Transactions",
                newName: "Contractor");
        }
    }
}
