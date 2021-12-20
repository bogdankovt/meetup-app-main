using System;
using meetup_rest_api.Core.Entity;

namespace meetup_rest_api.Features.Admin.Meetup_Guests
{
    public class GuestModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public DateTime Create_at { get; set; }

        public string SocialUrl { get; set; }
        
        public string Activity { get; set; }
        public string Institution { get; set; }
        public string Status { get; set; }
    }
}