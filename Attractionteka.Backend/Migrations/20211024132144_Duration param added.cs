using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Durationparamadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(7396),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(1781));

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "VideoFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(9632),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(4599));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 880, DateTimeKind.Local).AddTicks(9656),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 182, DateTimeKind.Local).AddTicks(4280));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "VideoFiles");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(1781),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(7396));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(4599),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(9632));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 182, DateTimeKind.Local).AddTicks(4280),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 880, DateTimeKind.Local).AddTicks(9656));
        }
    }
}
