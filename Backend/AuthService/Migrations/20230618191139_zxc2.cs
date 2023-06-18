using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class zxc2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AimEntityApplicationUser");

            migrationBuilder.CreateTable(
                name: "UserAims",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    AimId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserAims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserAims_Aim_AimId",
                        column: x => x.AimId,
                        principalTable: "Aim",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserAims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserAims_AimId",
                table: "UserAims",
                column: "AimId");

            migrationBuilder.CreateIndex(
                name: "IX_UserAims_UserId",
                table: "UserAims",
                column: "UserId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserAims");

            migrationBuilder.CreateTable(
                name: "AimEntityApplicationUser",
                columns: table => new
                {
                    AimId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UsersId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AimEntityApplicationUser", x => new { x.AimId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_AimEntityApplicationUser_Aim_AimId",
                        column: x => x.AimId,
                        principalTable: "Aim",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AimEntityApplicationUser_AspNetUsers_UsersId",
                        column: x => x.UsersId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AimEntityApplicationUser_UsersId",
                table: "AimEntityApplicationUser",
                column: "UsersId");
        }
    }
}
