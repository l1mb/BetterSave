using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class ChangeCardsName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CardEntity_AspNetUsers_UserId",
                table: "CardEntity");

            migrationBuilder.DropPrimaryKey(
                name: "PK_CardEntity",
                table: "CardEntity");

            migrationBuilder.RenameTable(
                name: "CardEntity",
                newName: "Card");

            migrationBuilder.RenameIndex(
                name: "IX_CardEntity_UserId",
                table: "Card",
                newName: "IX_Card_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Card",
                table: "Card",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Card_AspNetUsers_UserId",
                table: "Card",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Card_AspNetUsers_UserId",
                table: "Card");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Card",
                table: "Card");

            migrationBuilder.RenameTable(
                name: "Card",
                newName: "CardEntity");

            migrationBuilder.RenameIndex(
                name: "IX_Card_UserId",
                table: "CardEntity",
                newName: "IX_CardEntity_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_CardEntity",
                table: "CardEntity",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_CardEntity_AspNetUsers_UserId",
                table: "CardEntity",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
