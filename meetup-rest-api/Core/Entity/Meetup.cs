using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace meetup_rest_api.Core.Entity
{   
    [Table("meetups")]
    public class Meetup
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string ShortDescription { get; set; }
        public string LongDescription { get; set; }
        public DateTime BeginningAt { get; set; }
        public DateTime RegistrationDeadline { get; set; }
        public TimeSpan Duration {get; set;}
        public string ImageId { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string Slug { get; set; }
        
        public Meetup() {}
        public Meetup(int id, string title, string short_description, string long_description, DateTime beginning_at, TimeSpan duration, DateTime registration_deadline, string image_id, string status, string location, string slug)
        {
            this.Id = id;
            this.Title = title;
            this.ShortDescription = short_description;
            this.LongDescription = long_description;
            this.BeginningAt = beginning_at;
            this.Duration = duration;
            this.RegistrationDeadline = registration_deadline;
            this.Duration = duration;
            this.ImageId = image_id;
            this.Status = status;
            this.Location = location;
            this.Slug = slug;
        }
    }
}