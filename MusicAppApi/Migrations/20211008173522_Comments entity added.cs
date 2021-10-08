using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Commentsentityadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 8, 20, 35, 18, 370, DateTimeKind.Local).AddTicks(6896),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 464, DateTimeKind.Local).AddTicks(8211));

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "PlaceDescriptions",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 8, 20, 35, 18, 370, DateTimeKind.Local).AddTicks(8316),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 465, DateTimeKind.Local).AddTicks(3733));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 8, 20, 35, 18, 361, DateTimeKind.Local).AddTicks(3828),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 436, DateTimeKind.Local).AddTicks(6540));

            migrationBuilder.CreateTable(
                name: "Comments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorId = table.Column<int>(type: "int", nullable: true),
                    CommentTime = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PlaceId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Comments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Comments_PlaceDescriptions_PlaceId",
                        column: x => x.PlaceId,
                        principalTable: "PlaceDescriptions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Comments_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Comments_AuthorId",
                table: "Comments",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_Comments_PlaceId",
                table: "Comments",
                column: "PlaceId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Comments");

            migrationBuilder.DropColumn(
                name: "Rating",
                table: "PlaceDescriptions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 464, DateTimeKind.Local).AddTicks(8211),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 8, 20, 35, 18, 370, DateTimeKind.Local).AddTicks(6896));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 465, DateTimeKind.Local).AddTicks(3733),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 8, 20, 35, 18, 370, DateTimeKind.Local).AddTicks(8316));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 436, DateTimeKind.Local).AddTicks(6540),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 8, 20, 35, 18, 361, DateTimeKind.Local).AddTicks(3828));
        }
    }
}
