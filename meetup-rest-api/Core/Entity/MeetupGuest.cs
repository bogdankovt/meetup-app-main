using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace meetup_rest_api.Core.Entity
{   
    [Table("meetup_guests")]
    public class MeetupGuest
    {
        public int Id { get; set; }
        public string Status { get; set; }
        public DateTime CreatedAt { get; set; }
        public string Source { get; set; }

        public int MeetupId { get; set; }
        public Meetup Meetup { get; set; }
        public int GuestId { get; set; }
        public Guest Guest { get; set; }

        public int? ActivityId { get; set; }
        public Activity Activity { get; set; }
        public int? InstitutionId { get; set; }
        public Institution Institution { get; set; }

        public MeetupGuest(){}
        public MeetupGuest(int id, int meetup_id, int guest_id, int? activityId, int? institutionId,  string status, DateTime created_at, string source) {
            this.Id = id;
            this.MeetupId = meetup_id;
            this.GuestId = guest_id;
            this.ActivityId = activityId;
            this.InstitutionId = InstitutionId;
            this.Status = status;
            this.CreatedAt = created_at;
            this.Source = source;
        }
    }
}