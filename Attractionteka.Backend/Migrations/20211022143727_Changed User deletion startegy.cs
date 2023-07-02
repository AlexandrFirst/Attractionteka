using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class ChangedUserdeletionstartegy : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaceDescriptions_Users_AuthorId",
                table: "PlaceDescriptions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(6130),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 9, 14, 11, 2, 995, DateTimeKind.Local).AddTicks(4493));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(9000),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 9, 14, 11, 2, 995, DateTimeKind.Local).AddTicks(5711));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 790, DateTimeKind.Local).AddTicks(1331),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 9, 14, 11, 2, 986, DateTimeKind.Local).AddTicks(7110));

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceDescriptions_Users_AuthorId",
                table: "PlaceDescriptions",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PlaceDescriptions_Users_AuthorId",
                table: "PlaceDescriptions");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 9, 14, 11, 2, 995, DateTimeKind.Local).AddTicks(4493),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(6130));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 9, 14, 11, 2, 995, DateTimeKind.Local).AddTicks(5711),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 804, DateTimeKind.Local).AddTicks(9000));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 9, 14, 11, 2, 986, DateTimeKind.Local).AddTicks(7110),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 22, 17, 37, 25, 790, DateTimeKind.Local).AddTicks(1331));

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceDescriptions_Users_AuthorId",
                table: "PlaceDescriptions",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
