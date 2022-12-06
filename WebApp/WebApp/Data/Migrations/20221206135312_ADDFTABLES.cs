using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApp.Data.Migrations
{
    public partial class ADDFTABLES : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Airplanes",
                columns: table => new
                {
                    IDA = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Name_Airplanes = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Number_places = table.Column<int>(type: "int", nullable: false),
                    Creator = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Airplanes", x => x.IDA);
                });

            migrationBuilder.CreateTable(
                name: "Flights",
                columns: table => new
                {
                    FID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    IDA = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Date_and_Time_of_Departure = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Date_and_Time_of_Arrival = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Departure_Point = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Departure_Airport = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Point_of_Arrival = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Arrival_Airport = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Status = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Number_Free_places = table.Column<int>(type: "int", nullable: false),
                    IDT = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Flights", x => x.FID);
                });

            migrationBuilder.CreateTable(
                name: "Mans",
                columns: table => new
                {
                    IDM = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Passport_number = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Surname = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Sex = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mans", x => x.IDM);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    IDF = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    MID = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false)
                },
                constraints: table =>
                {
                });

            migrationBuilder.CreateIndex(
                name: "IV_PersistedGrants_ConsumedTime",
                table: "PersistedGrants",
                column: "ConsumedTime");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Airplanes");

            migrationBuilder.DropTable(
                name: "Flights");

            migrationBuilder.DropTable(
                name: "Mans");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropIndex(
                name: "IV_PersistedGrants_ConsumedTime",
                table: "PersistedGrants");
        }
    }
}
