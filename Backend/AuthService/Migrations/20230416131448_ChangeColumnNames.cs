using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class ChangeColumnNames : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "AimType",
                table: "Aim",
                newName: "Type");

            migrationBuilder.RenameColumn(
                name: "AimDateType",
                table: "Aim",
                newName: "DateType");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Type",
                table: "Aim",
                newName: "AimType");

            migrationBuilder.RenameColumn(
                name: "DateType",
                table: "Aim",
                newName: "AimDateType");
        }
    }
}
