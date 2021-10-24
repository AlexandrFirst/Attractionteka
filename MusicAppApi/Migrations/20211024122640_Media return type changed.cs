using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Mediareturntypechanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(1781),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(6130));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "VideoFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(4599),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(9000));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "PhotoFiles",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 182, DateTimeKind.Local).AddTicks(4280),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 790, DateTimeKind.Local).AddTicks(1331));

            migrationBuilder.AddColumn<string>(
                name: "Name",
                table: "AudioFiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Name",
                table: "VideoFiles");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "PhotoFiles");

            migrationBuilder.DropColumn(
                name: "Name",
                table: "AudioFiles");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(6130),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(1781));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(9000),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 197, DateTimeKind.Local).AddTicks(4599));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 790, DateTimeKind.Local).AddTicks(1331),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 15, 26, 39, 182, DateTimeKind.Local).AddTicks(4280));
        }
    }
}
