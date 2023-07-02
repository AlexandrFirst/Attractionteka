using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace MusicAppApi.Migrations
{
    public partial class Dbfordestsadded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlaceDescription",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ShortDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AuthorId = table.Column<int>(type: "int", nullable: true),
                    UploadTime = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlaceDescription", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlaceDescription_Users_AuthorId",
                        column: x => x.AuthorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AudioFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceDescriptionId = table.Column<int>(type: "int", nullable: true),
                    UploadTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2021, 10, 1, 17, 53, 43, 325, DateTimeKind.Local).AddTicks(4050))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AudioFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AudioFiles_PlaceDescription_PlaceDescriptionId",
                        column: x => x.PlaceDescriptionId,
                        principalTable: "PlaceDescription",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhotoFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceDescriptionId = table.Column<int>(type: "int", nullable: true),
                    UploadTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2021, 10, 1, 17, 53, 43, 347, DateTimeKind.Local).AddTicks(1094))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhotoFiles_PlaceDescription_PlaceDescriptionId",
                        column: x => x.PlaceDescriptionId,
                        principalTable: "PlaceDescription",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VideoFiles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PlaceDescriptionId = table.Column<int>(type: "int", nullable: true),
                    UploadTime = table.Column<DateTime>(type: "datetime2", nullable: false, defaultValue: new DateTime(2021, 10, 1, 17, 53, 43, 346, DateTimeKind.Local).AddTicks(8794))
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoFiles", x => x.Id);
                    table.ForeignKey(
                        name: "FK_VideoFiles_PlaceDescription_PlaceDescriptionId",
                        column: x => x.PlaceDescriptionId,
                        principalTable: "PlaceDescription",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AudioFiles_PlaceDescriptionId",
                table: "AudioFiles",
                column: "PlaceDescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoFiles_PlaceDescriptionId",
                table: "PhotoFiles",
                column: "PlaceDescriptionId");

            migrationBuilder.CreateIndex(
                name: "IX_PlaceDescription_AuthorId",
                table: "PlaceDescription",
                column: "AuthorId");

            migrationBuilder.CreateIndex(
                name: "IX_VideoFiles_PlaceDescriptionId",
                table: "VideoFiles",
                column: "PlaceDescriptionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AudioFiles");

            migrationBuilder.DropTable(
                name: "PhotoFiles");

            migrationBuilder.DropTable(
                name: "VideoFiles");

            migrationBuilder.DropTable(
                name: "PlaceDescription");
        }
    }
}
