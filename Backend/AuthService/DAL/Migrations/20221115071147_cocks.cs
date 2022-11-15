using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class cocks : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SpendingShopPositions");

            migrationBuilder.CreateTable(
                name: "ShopPositionSpending",
                columns: table => new
                {
                    ShopPositionsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpendingsId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ShopPositionSpending", x => new { x.ShopPositionsId, x.SpendingsId });
                    table.ForeignKey(
                        name: "FK_ShopPositionSpending_ShopPositions_ShopPositionsId",
                        column: x => x.ShopPositionsId,
                        principalTable: "ShopPositions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ShopPositionSpending_Spendings_SpendingsId",
                        column: x => x.SpendingsId,
                        principalTable: "Spendings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ShopPositionSpending_SpendingsId",
                table: "ShopPositionSpending",
                column: "SpendingsId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ShopPositionSpending");

            migrationBuilder.CreateTable(
                name: "SpendingShopPositions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    ShopPositionId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    SpendingId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SpendingShopPositions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SpendingShopPositions_ShopPositions_ShopPositionId",
                        column: x => x.ShopPositionId,
                        principalTable: "ShopPositions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_SpendingShopPositions_Spendings_SpendingId",
                        column: x => x.SpendingId,
                        principalTable: "Spendings",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_SpendingShopPositions_ShopPositionId",
                table: "SpendingShopPositions",
                column: "ShopPositionId");

            migrationBuilder.CreateIndex(
                name: "IX_SpendingShopPositions_SpendingId",
                table: "SpendingShopPositions",
                column: "SpendingId");
        }
    }
}
