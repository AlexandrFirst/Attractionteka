using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Durationparamaddedforaudio : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 30, 37, 572, DateTimeKind.Local).AddTicks(7370),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(7396));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 30, 37, 572, DateTimeKind.Local).AddTicks(9452),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(9632));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 30, 37, 559, DateTimeKind.Local).AddTicks(4226),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 880, DateTimeKind.Local).AddTicks(9656));

            migrationBuilder.AddColumn<string>(
                name: "Duration",
                table: "AudioFiles",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Duration",
                table: "AudioFiles");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(7396),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 30, 37, 572, DateTimeKind.Local).AddTicks(7370));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 893, DateTimeKind.Local).AddTicks(9632),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 30, 37, 572, DateTimeKind.Local).AddTicks(9452));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 24, 16, 21, 43, 880, DateTimeKind.Local).AddTicks(9656),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 24, 16, 30, 37, 559, DateTimeKind.Local).AddTicks(4226));
        }
    }
}
