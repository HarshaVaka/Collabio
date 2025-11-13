using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BuddyGoals.Migrations
{
    /// <inheritdoc />
    public partial class ModifiedColumnsAddition : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "ModifiedAt",
                table: "FriendRequests",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ModifiedAt",
                table: "FriendRequests");
        }
    }
}
