using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace meetup_rest_api.Migrations
{
    public partial class updatemeetupguests : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_guests_activities_activity_id",
                table: "guests");

            migrationBuilder.DropForeignKey(
                name: "fk_users_roles_role_id",
                table: "users");

            migrationBuilder.AlterColumn<int>(
                name: "role_id",
                table: "users",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddColumn<int>(
                name: "activity_id",
                table: "meetup_guests",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "institution_id",
                table: "meetup_guests",
                type: "integer",
                nullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "activity_id",
                table: "guests",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateIndex(
                name: "ix_meetup_guests_activity_id",
                table: "meetup_guests",
                column: "activity_id");

            migrationBuilder.CreateIndex(
                name: "ix_meetup_guests_institution_id",
                table: "meetup_guests",
                column: "institution_id");

            migrationBuilder.AddForeignKey(
                name: "fk_guests_activities_activity_id",
                table: "guests",
                column: "activity_id",
                principalTable: "activities",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_meetup_guests_activities_activity_id",
                table: "meetup_guests",
                column: "activity_id",
                principalTable: "activities",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_meetup_guests_institutions_institution_id",
                table: "meetup_guests",
                column: "institution_id",
                principalTable: "institutions",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "fk_users_roles_role_id",
                table: "users",
                column: "role_id",
                principalTable: "roles",
                principalColumn: "id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "fk_guests_activities_activity_id",
                table: "guests");

            migrationBuilder.DropForeignKey(
                name: "fk_meetup_guests_activities_activity_id",
                table: "meetup_guests");

            migrationBuilder.DropForeignKey(
                name: "fk_meetup_guests_institutions_institution_id",
                table: "meetup_guests");

            migrationBuilder.DropForeignKey(
                name: "fk_users_roles_role_id",
                table: "users");

            migrationBuilder.DropIndex(
                name: "ix_meetup_guests_activity_id",
                table: "meetup_guests");

            migrationBuilder.DropIndex(
                name: "ix_meetup_guests_institution_id",
                table: "meetup_guests");

            migrationBuilder.DropColumn(
                name: "activity_id",
                table: "meetup_guests");

            migrationBuilder.DropColumn(
                name: "institution_id",
                table: "meetup_guests");

            migrationBuilder.AlterColumn<int>(
                name: "role_id",
                table: "users",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "activity_id",
                table: "guests",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "fk_guests_activities_activity_id",
                table: "guests",
                column: "activity_id",
                principalTable: "activities",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "fk_users_roles_role_id",
                table: "users",
                column: "role_id",
                principalTable: "roles",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
