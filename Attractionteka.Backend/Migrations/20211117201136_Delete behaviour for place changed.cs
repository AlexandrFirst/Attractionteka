using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Deletebehaviourforplacechanged : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 841, DateTimeKind.Local).AddTicks(7842),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 2, 10, 36, 10, 934, DateTimeKind.Local).AddTicks(2514));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 842, DateTimeKind.Local).AddTicks(903),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 2, 10, 36, 10, 934, DateTimeKind.Local).AddTicks(6549));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 815, DateTimeKind.Local).AddTicks(7138),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 2, 10, 36, 10, 905, DateTimeKind.Local).AddTicks(8277));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "VideoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 2, 10, 36, 10, 934, DateTimeKind.Local).AddTicks(2514),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 841, DateTimeKind.Local).AddTicks(7842));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "PhotoFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 2, 10, 36, 10, 934, DateTimeKind.Local).AddTicks(6549),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 842, DateTimeKind.Local).AddTicks(903));

            migrationBuilder.AlterColumn<DateTime>(
                name: "UploadTime",
                table: "AudioFiles",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(2021, 11, 2, 10, 36, 10, 905, DateTimeKind.Local).AddTicks(8277),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldDefaultValue: new DateTime(2021, 11, 17, 22, 11, 34, 815, DateTimeKind.Local).AddTicks(7138));
        }
    }
}
