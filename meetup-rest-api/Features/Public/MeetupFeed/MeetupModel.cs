using System;

namespace meetup_rest_api.Features.Public.MeetupFeed
{
    public class MeetUpModel
    {

        public MeetUpModel(string title, string image_id, DateTime beginning_at, string short_description, string status, string slug)
        {
            this.Title = title;
            this.Image_id = image_id;
            this.Beginning_at = beginning_at;
            this.Short_description = short_description;
            this.Status = status;
            this.Slug = slug;

        }
        public string Title { get; set; }
        public string Image_id { get; set; }
        public DateTime Beginning_at { get; set; }
        public string Short_description { get; set; }
        public string Status { get; set; }
        public string Slug { get; set; }

    }
}