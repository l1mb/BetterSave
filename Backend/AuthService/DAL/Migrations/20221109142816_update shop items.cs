using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class updateshopitems : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "ShopPositionSpending",
                columns: table => new
                {
                    ShopPositionsId = table.Column<int>(type: "int", nullable: false),
                    SpendingsId = table.Column<int>(type: "int", nullable: false)
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
        }
    }
}
