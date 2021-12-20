﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using meetup_rest_api;

#nullable disable

namespace meetup_rest_api.Migrations
{
    [DbContext(typeof(MeetupContext))]
    [Migration("20211220122109_update-meetup-guests")]
    partial class updatemeetupguests
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("meetup_rest_api.Core.Entity.Activity", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_activities");

                    b.ToTable("activities", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.Guest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("ActivityId")
                        .HasColumnType("integer")
                        .HasColumnName("activity_id");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("birthday");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("first_name");

                    b.Property<int?>("InstitutionId")
                        .HasColumnType("integer")
                        .HasColumnName("institution_id");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("last_name");

                    b.Property<string>("Phone")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("phone");

                    b.Property<string>("SocialUrl")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("social_url");

                    b.HasKey("Id")
                        .HasName("pk_guests");

                    b.HasIndex("ActivityId")
                        .HasDatabaseName("ix_guests_activity_id");

                    b.HasIndex("InstitutionId")
                        .HasDatabaseName("ix_guests_institution_id");

                    b.ToTable("guests", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.Institution", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_institutions");

                    b.ToTable("institutions", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.Meetup", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("BeginningAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("beginning_at");

                    b.Property<TimeSpan>("Duration")
                        .HasColumnType("interval")
                        .HasColumnName("duration");

                    b.Property<string>("ImageId")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("image_id");

                    b.Property<string>("Location")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("location");

                    b.Property<string>("LongDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("long_description");

                    b.Property<DateTime>("RegistrationDeadline")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("registration_deadline");

                    b.Property<string>("ShortDescription")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("short_description");

                    b.Property<string>("Slug")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("slug");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.Property<string>("Title")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("title");

                    b.HasKey("Id")
                        .HasName("pk_meetups");

                    b.ToTable("meetups", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.MeetupGuest", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("ActivityId")
                        .HasColumnType("integer")
                        .HasColumnName("activity_id");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone")
                        .HasColumnName("created_at");

                    b.Property<int>("GuestId")
                        .HasColumnType("integer")
                        .HasColumnName("guest_id");

                    b.Property<int?>("InstitutionId")
                        .HasColumnType("integer")
                        .HasColumnName("institution_id");

                    b.Property<int>("MeetupId")
                        .HasColumnType("integer")
                        .HasColumnName("meetup_id");

                    b.Property<string>("Source")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("source");

                    b.Property<string>("Status")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("status");

                    b.HasKey("Id")
                        .HasName("pk_meetup_guests");

                    b.HasIndex("ActivityId")
                        .HasDatabaseName("ix_meetup_guests_activity_id");

                    b.HasIndex("GuestId")
                        .HasDatabaseName("ix_meetup_guests_guest_id");

                    b.HasIndex("InstitutionId")
                        .HasDatabaseName("ix_meetup_guests_institution_id");

                    b.HasIndex("MeetupId")
                        .HasDatabaseName("ix_meetup_guests_meetup_id");

                    b.ToTable("meetup_guests", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.Role", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("name");

                    b.HasKey("Id")
                        .HasName("pk_roles");

                    b.ToTable("roles", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.User", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer")
                        .HasColumnName("id");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("email");

                    b.Property<int>("GuestId")
                        .HasColumnType("integer")
                        .HasColumnName("guest_id");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("text")
                        .HasColumnName("password");

                    b.Property<int?>("RoleId")
                        .HasColumnType("integer")
                        .HasColumnName("role_id");

                    b.HasKey("Id")
                        .HasName("pk_users");

                    b.HasIndex("GuestId")
                        .HasDatabaseName("ix_users_guest_id");

                    b.HasIndex("RoleId")
                        .HasDatabaseName("ix_users_role_id");

                    b.ToTable("users", (string)null);
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.Guest", b =>
                {
                    b.HasOne("meetup_rest_api.Core.Entity.Activity", "Activity")
                        .WithMany()
                        .HasForeignKey("ActivityId")
                        .HasConstraintName("fk_guests_activities_activity_id");

                    b.HasOne("meetup_rest_api.Core.Entity.Institution", "Institution")
                        .WithMany()
                        .HasForeignKey("InstitutionId")
                        .HasConstraintName("fk_guests_institutions_institution_id");

                    b.Navigation("Activity");

                    b.Navigation("Institution");
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.MeetupGuest", b =>
                {
                    b.HasOne("meetup_rest_api.Core.Entity.Activity", "Activity")
                        .WithMany()
                        .HasForeignKey("ActivityId")
                        .HasConstraintName("fk_meetup_guests_activities_activity_id");

                    b.HasOne("meetup_rest_api.Core.Entity.Guest", "Guest")
                        .WithMany()
                        .HasForeignKey("GuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_meetup_guests_guests_guest_id");

                    b.HasOne("meetup_rest_api.Core.Entity.Institution", "Institution")
                        .WithMany()
                        .HasForeignKey("InstitutionId")
                        .HasConstraintName("fk_meetup_guests_institutions_institution_id");

                    b.HasOne("meetup_rest_api.Core.Entity.Meetup", "Meetup")
                        .WithMany()
                        .HasForeignKey("MeetupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_meetup_guests_meetups_meetup_id");

                    b.Navigation("Activity");

                    b.Navigation("Guest");

                    b.Navigation("Institution");

                    b.Navigation("Meetup");
                });

            modelBuilder.Entity("meetup_rest_api.Core.Entity.User", b =>
                {
                    b.HasOne("meetup_rest_api.Core.Entity.Guest", "Guest")
                        .WithMany()
                        .HasForeignKey("GuestId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired()
                        .HasConstraintName("fk_users_guests_guest_id");

                    b.HasOne("meetup_rest_api.Core.Entity.Role", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .HasConstraintName("fk_users_roles_role_id");

                    b.Navigation("Guest");

                    b.Navigation("Role");
                });
#pragma warning restore 612, 618
        }
    }
}
