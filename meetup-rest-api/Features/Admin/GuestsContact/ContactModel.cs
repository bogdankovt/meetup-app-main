using System;
using meetup_rest_api.Core.Entity;

namespace meetup_rest_api.Features.Admin.Guests
{
    public class ContactModel
    {
        public static ContactModel ToContactModelDto(Guest guest)
        {
            return new ContactModel()
            { 
                Id = guest.Id,
                FirstName = guest.FirstName,
                LastName = guest.LastName,
                Email = guest.Email,
                Phone = guest.Phone,
                Birthday = guest.Birthday,
                SocialUrl = guest.SocialUrl,
                Activity = guest.Activity,
                Institution = guest.Institution
            };
        }


        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public string SocialUrl { get; set; }
        
        public Activity Activity { get; set; }
        public Institution Institution { get; set; }

        
    }
}