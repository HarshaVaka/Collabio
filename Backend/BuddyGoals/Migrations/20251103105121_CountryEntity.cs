using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuddyGoals.Migrations
{
    /// <inheritdoc />
    public partial class CountryEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Countries",
                columns: table => new
                {
                    CountryCode = table.Column<string>(type: "text", nullable: false),
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    CountryName = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Countries", x => x.CountryCode);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserProfiles_CountryCode",
                table: "UserProfiles",
                column: "CountryCode");

            migrationBuilder.AddForeignKey(
                name: "FK_UserProfiles_Countries_CountryCode",
                table: "UserProfiles",
                column: "CountryCode",
                principalTable: "Countries",
                principalColumn: "CountryCode",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserProfiles_Countries_CountryCode",
                table: "UserProfiles");

            migrationBuilder.DropTable(
                name: "Countries");

            migrationBuilder.DropIndex(
                name: "IX_UserProfiles_CountryCode",
                table: "UserProfiles");
        }
    }
}
