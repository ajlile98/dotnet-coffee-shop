using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    /// <inheritdoc />
    public partial class RefactorAwayfromCustomer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Photos_Customers_CustomerId",
                table: "Photos");

            migrationBuilder.DropTable(
                name: "Customers");

            migrationBuilder.DropIndex(
                name: "IX_Photos_CustomerId",
                table: "Photos");

            migrationBuilder.DropColumn(
                name: "CustomerId",
                table: "Photos");

            migrationBuilder.RenameColumn(
                name: "Timestamp",
                table: "Orders",
                newName: "Created");

            migrationBuilder.AddColumn<DateTime>(
                name: "Completed",
                table: "Orders",
                type: "TEXT",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "ItemPhotoId",
                table: "MenuItems",
                type: "INTEGER",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MenuItems_ItemPhotoId",
                table: "MenuItems",
                column: "ItemPhotoId");

            migrationBuilder.AddForeignKey(
                name: "FK_MenuItems_Photos_ItemPhotoId",
                table: "MenuItems",
                column: "ItemPhotoId",
                principalTable: "Photos",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_MenuItems_Photos_ItemPhotoId",
                table: "MenuItems");

            migrationBuilder.DropIndex(
                name: "IX_MenuItems_ItemPhotoId",
                table: "MenuItems");

            migrationBuilder.DropColumn(
                name: "Completed",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "ItemPhotoId",
                table: "MenuItems");

            migrationBuilder.RenameColumn(
                name: "Created",
                table: "Orders",
                newName: "Timestamp");

            migrationBuilder.AddColumn<string>(
                name: "CustomerId",
                table: "Photos",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "Customers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "TEXT", nullable: false),
                    City = table.Column<string>(type: "TEXT", nullable: false),
                    Country = table.Column<string>(type: "TEXT", nullable: false),
                    Created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    DateOfBirth = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    DisplayName = table.Column<string>(type: "TEXT", nullable: false),
                    Gender = table.Column<string>(type: "TEXT", nullable: false),
                    ImageUrl = table.Column<string>(type: "TEXT", nullable: true),
                    LastActive = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Customers_Users_Id",
                        column: x => x.Id,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_CustomerId",
                table: "Photos",
                column: "CustomerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Photos_Customers_CustomerId",
                table: "Photos",
                column: "CustomerId",
                principalTable: "Customers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
