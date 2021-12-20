using System;
using meetup_rest_api.Core.Entity;


namespace meetup_rest_api.Features.Admin.Meetups_Control
{
    public class MeetupModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Status { get; set; }
        public string Slag { get; set; }
        public DateTime Beginning_at { get; set; }
        public int CountRegistration { get; set; }

        public MeetupModel(int id, string title, string status, string slag, DateTime beginning_at, int countRegistration)
        {
            Id = id;
            Title = title;
            Status = status;
            Slag = slag;
            Beginning_at = beginning_at;
            CountRegistration = countRegistration;
        }

        static public MeetupModel FromEntity(Meetup meetup, int countRegistrations) {
            return new MeetupModel(meetup.Id, meetup.Title, meetup.Status, meetup.Slug, meetup.BeginningAt, countRegistrations);
        }
    }
}