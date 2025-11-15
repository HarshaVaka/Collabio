using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuddyGoals.Migrations
{
    /// <inheritdoc />
    public partial class hashColumnSpellChange : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HashedPassowrd",
                table: "Users",
                newName: "HashedPassword");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HashedPassword",
                table: "Users",
                newName: "HashedPassowrd");
        }
    }
}
