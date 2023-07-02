using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class placeentityadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AudioFiles_PlaceDescription_PlaceDescriptionId",
                table: "AudioFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_PhotoFiles_PlaceDescription_PlaceDescriptionId",
                table: "PhotoFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaceDescription_Users_AuthorId",
                table: "PlaceDescription");

            migrationBuilder.DropForeignKey(
                name: "FK_VideoFiles_PlaceDescription_PlaceDescriptionId",
                table: "VideoFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlaceDescription",
                table: "PlaceDescription");

            migrationBuilder.RenameTable(
                name: "PlaceDescription",
                newName: "PlaceDescriptions");

            migrationBuilder.RenameIndex(
                name: "IX_PlaceDescription_AuthorId",
                table: "PlaceDescriptions",
                newName: "IX_PlaceDescriptions_AuthorId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 464, DateTimeKind.Local).AddTicks(8211),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 1, 18, 7, 49, 659, DateTimeKind.Local).AddTicks(4285));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 465, DateTimeKind.Local).AddTicks(3733),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 1, 18, 7, 49, 660, DateTimeKind.Local).AddTicks(2261));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 436, DateTimeKind.Local).AddTicks(6540),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 1, 18, 7, 49, 580, DateTimeKind.Local).AddTicks(9022));

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlaceDescriptions",
                table: "PlaceDescriptions",
                column: "Id");

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
                name: "FK_PlaceDescriptions_Users_AuthorId",
                table: "PlaceDescriptions",
                column: "AuthorId",
                principalTable: "Users",
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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AudioFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "AudioFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_PhotoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "PhotoFiles");

            migrationBuilder.DropForeignKey(
                name: "FK_PlaceDescriptions_Users_AuthorId",
                table: "PlaceDescriptions");

            migrationBuilder.DropForeignKey(
                name: "FK_VideoFiles_PlaceDescriptions_PlaceDescriptionId",
                table: "VideoFiles");

            migrationBuilder.DropPrimaryKey(
                name: "PK_PlaceDescriptions",
                table: "PlaceDescriptions");

            migrationBuilder.RenameTable(
                name: "PlaceDescriptions",
                newName: "PlaceDescription");

            migrationBuilder.RenameIndex(
                name: "IX_PlaceDescriptions_AuthorId",
                table: "PlaceDescription",
                newName: "IX_PlaceDescription_AuthorId");

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 1, 18, 7, 49, 659, DateTimeKind.Local).AddTicks(4285),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 464, DateTimeKind.Local).AddTicks(8211));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 1, 18, 7, 49, 660, DateTimeKind.Local).AddTicks(2261),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 465, DateTimeKind.Local).AddTicks(3733));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 10, 1, 18, 7, 49, 580, DateTimeKind.Local).AddTicks(9022),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 10, 4, 14, 57, 53, 436, DateTimeKind.Local).AddTicks(6540));

            migrationBuilder.AddPrimaryKey(
                name: "PK_PlaceDescription",
                table: "PlaceDescription",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_AudioFiles_PlaceDescription_PlaceDescriptionId",
                table: "AudioFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PhotoFiles_PlaceDescription_PlaceDescriptionId",
                table: "PhotoFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_PlaceDescription_Users_AuthorId",
                table: "PlaceDescription",
                column: "AuthorId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_VideoFiles_PlaceDescription_PlaceDescriptionId",
                table: "VideoFiles",
                column: "PlaceDescriptionId",
                principalTable: "PlaceDescription",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
