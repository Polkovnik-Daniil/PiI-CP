using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.Data.Migrations
{
    public partial class Add4table : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "_airplanes",
                columns: table => new
                {
                    IDA = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name_Airplanes = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number_places = table.Column<int>(type: "int", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__airplanes", x => x.IDA);
                });

            migrationBuilder.CreateTable(
                name: "_flights",
                columns: table => new
                {
                    FID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IDA = table.Column<int>(type: "int", nullable: false),
                    Date_and_Time_of_Departure = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date_and_Time_of_Arrival = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Departure_Point = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Departure_Airport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Point_of_Arrival = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Arrival_Airport = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Number_Free_places = table.Column<int>(type: "int", nullable: false),
                    IDT = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__flights", x => x.FID);
                });

            migrationBuilder.CreateTable(
                name: "_mans",
                columns: table => new
                {
                    IDM = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Passport_number = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Sex = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__mans", x => x.IDM);
                });

            migrationBuilder.CreateTable(
                name: "_tickets",
                columns: table => new
                {
                    IDF = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MID = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__tickets", x => x.IDF);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersistedGrants_ConsumedTime",
                table: "PersistedGrants",
                column: "ConsumedTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "_airplanes");

            migrationBuilder.DropTable(
                name: "_flights");

            migrationBuilder.DropTable(
                name: "_mans");

            migrationBuilder.DropTable(
                name: "_tickets");

            migrationBuilder.DropIndex(
                name: "IX_PersistedGrants_ConsumedTime",
                table: "PersistedGrants");
        }
    }
}
