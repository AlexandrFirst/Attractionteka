using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Userhistoryadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 755, DateTimeKind.Local).AddTicks(7161),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 19, 39, 50, 463, DateTimeKind.Local).AddTicks(3434));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 755, DateTimeKind.Local).AddTicks(8384),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 19, 39, 50, 463, DateTimeKind.Local).AddTicks(4733));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 746, DateTimeKind.Local).AddTicks(5817),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 19, 39, 50, 454, DateTimeKind.Local).AddTicks(1503));

            migrationBuilder.CreateTable(
                name: "UsersHistory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<int>(type: "int", nullable: true),
                    VisitedPlaceId = table.Column<int>(type: "int", nullable: true),
                    VisitTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 776, DateTimeKind.Local).AddTicks(5649))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UsersHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UsersHistory_PlaceDescriptions_VisitedPlaceId",
                        column: x => x.VisitedPlaceId,
                        principalTable: "PlaceDescriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UsersHistory_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UsersHistory_UserId",
                table: "UsersHistory",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_UsersHistory_VisitedPlaceId",
                table: "UsersHistory",
                column: "VisitedPlaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UsersHistory");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 19, 39, 50, 463, DateTimeKind.Local).AddTicks(3434),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 755, DateTimeKind.Local).AddTicks(7161));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 19, 39, 50, 463, DateTimeKind.Local).AddTicks(4733),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 755, DateTimeKind.Local).AddTicks(8384));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 19, 39, 50, 454, DateTimeKind.Local).AddTicks(1503),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 17, 13, 1, 31, 746, DateTimeKind.Local).AddTicks(5817));
        }
    }
}
