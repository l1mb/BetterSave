using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AuthServiceApp.Migrations
{
    public partial class @new : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aim_AimType_AimTypeId",
                table: "Aim");

            migrationBuilder.DropIndex(
                name: "IX_Aim_AimTypeId",
                table: "Aim");

            migrationBuilder.DropColumn(
                name: "AimTypeId",
                table: "Aim");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "Aim");

            migrationBuilder.AddColumn<int>(
                name: "AimType",
                table: "Aim",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<Guid>(
                name: "AimTypeEntityId",
                table: "Aim",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<float>(
                name: "Amount",
                table: "Aim",
                type: "real",
                nullable: false,
                defaultValue: 0f);

            migrationBuilder.AddColumn<DateTime>(
                name: "FinishDate",
                table: "Aim",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_Aim_AimTypeEntityId",
                table: "Aim",
                column: "AimTypeEntityId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aim_AimType_AimTypeEntityId",
                table: "Aim",
                column: "AimTypeEntityId",
                principalTable: "AimType",
                principalColumn: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Aim_AimType_AimTypeEntityId",
                table: "Aim");

            migrationBuilder.DropIndex(
                name: "IX_Aim_AimTypeEntityId",
                table: "Aim");

            migrationBuilder.DropColumn(
                name: "AimType",
                table: "Aim");

            migrationBuilder.DropColumn(
                name: "AimTypeEntityId",
                table: "Aim");

            migrationBuilder.DropColumn(
                name: "Amount",
                table: "Aim");

            migrationBuilder.DropColumn(
                name: "FinishDate",
                table: "Aim");

            migrationBuilder.AddColumn<Guid>(
                name: "AimTypeId",
                table: "Aim",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "Aim",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Aim_AimTypeId",
                table: "Aim",
                column: "AimTypeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Aim_AimType_AimTypeId",
                table: "Aim",
                column: "AimTypeId",
                principalTable: "AimType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
