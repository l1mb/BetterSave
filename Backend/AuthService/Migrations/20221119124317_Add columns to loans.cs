using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class Addcolumnstoloans : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<float>(
                name: "Amount",
                table: "Loans",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<string>(
                name: "Currency",
                table: "Loans",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Loans");

            migrationBuilder.DropColumn(
                name: "Currency",
                table: "Loans");
        }
    }
}
