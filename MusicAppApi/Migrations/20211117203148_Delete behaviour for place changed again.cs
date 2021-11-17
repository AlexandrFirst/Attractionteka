using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Deletebehaviourforplacechangedagain : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AudioFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "AudioFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_PhotoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "PhotoFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VideoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "VideoFiles");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 31, 45, 965, DateTimeKind.Local).AddTicks(1817),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 841, DateTimeKind.Local).AddTicks(7842));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 31, 45, 965, DateTimeKind.Local).AddTicks(7303),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 842, DateTimeKind.Local).AddTicks(903));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 31, 45, 923, DateTimeKind.Local).AddTicks(2053),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 815, DateTimeKind.Local).AddTicks(7138));

            migrationBuilder.AddForeignKey(
                name: "FK_AudioFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "AudioFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "PhotoFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_VideoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "VideoFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AudioFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "AudioFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_PhotoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "PhotoFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_VideoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "VideoFiles");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 841, DateTimeKind.Local).AddTicks(7842),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 31, 45, 965, DateTimeKind.Local).AddTicks(1817));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 842, DateTimeKind.Local).AddTicks(903),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 31, 45, 965, DateTimeKind.Local).AddTicks(7303));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 815, DateTimeKind.Local).AddTicks(7138),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 31, 45, 923, DateTimeKind.Local).AddTicks(2053));

            migrationBuilder.AddForeignKey(
                name: "FK_AudioFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "AudioFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "PhotoFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VideoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "VideoFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescriptions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
