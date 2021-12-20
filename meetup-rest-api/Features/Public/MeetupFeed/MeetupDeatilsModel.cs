using System;

namespace meetup_rest_api.Features.Public.MeetupFeed
{
    public class MeetupDetailsModel
    {
        public string Title { get; set; }
        public string Long_description { get; set; }
        public DateTime Beginning_at { get; set; }
        public DateTime Registration_deadline { get; set; }
        public TimeSpan Duration { get; set; }
        public string Image_id { get; set; }
        public string Status { get; set; }
        public string Location { get; set; }
        public string Slug { get; set; }
        public string Registration_status {get; set;}

        public MeetupDetailsModel(string title, string long_description, DateTime beginning_at, DateTime registration_deadline, TimeSpan duration, string image_id, string status, string location, string slug, string user_registration_status)
        {
            this.Title = title;
            this.Long_description = long_description;
            this.Beginning_at = beginning_at;
            this.Registration_deadline = registration_deadline;
            this.Duration = duration;
            this.Image_id = image_id;
            this.Status = status;
            this.Location = location;
            this.Slug = slug;
            this.Registration_status = user_registration_status;
        }

    }
}