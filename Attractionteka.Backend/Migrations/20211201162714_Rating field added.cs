using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Ratingfieldadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 18, 27, 12, 24, DateTimeKind.Local).AddTicks(1182),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 18, 16, 53, 568, DateTimeKind.Local).AddTicks(2449));

            migrationBuilder.AddColumn<double>(
                name: "Rating",
                table: "Ratings",
                type: "float",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 18, 27, 12, 24, DateTimeKind.Local).AddTicks(2451),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 18, 16, 53, 568, DateTimeKind.Local).AddTicks(3810));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 18, 27, 12, 15, DateTimeKind.Local).AddTicks(3162),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 18, 16, 53, 559, DateTimeKind.Local).AddTicks(6806));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "Ratings");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 18, 16, 53, 568, DateTimeKind.Local).AddTicks(2449),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 18, 27, 12, 24, DateTimeKind.Local).AddTicks(1182));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 18, 16, 53, 568, DateTimeKind.Local).AddTicks(3810),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 18, 27, 12, 24, DateTimeKind.Local).AddTicks(2451));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 12, 1, 18, 16, 53, 559, DateTimeKind.Local).AddTicks(6806),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 12, 1, 18, 27, 12, 15, DateTimeKind.Local).AddTicks(3162));
        }
    }
}
