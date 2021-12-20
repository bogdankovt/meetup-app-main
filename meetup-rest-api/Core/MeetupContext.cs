using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using meetup_rest_api.Core.Entity;

namespace meetup_rest_api
{
    public class MeetupContext : DbContext
    {
        public DbSet<Meetup> Meetups { get; set; }
        public DbSet<MeetupGuest> MeetupGuests { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Guest> Guests { get; set; }
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Institution> Institutions { get; set; }
        public DbSet<Role> Roles { get; set; }

        public MeetupContext(DbContextOptions options) : base(options) { }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder
                .LogTo(Console.WriteLine);
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
        }
    }
}
