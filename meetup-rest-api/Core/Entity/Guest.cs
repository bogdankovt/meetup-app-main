using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace meetup_rest_api.Core.Entity
{   
    [Table("guests")]
    public class Guest
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        
        [Required]
        public string Email { get; set; }
        public string Phone { get; set; }
        public DateTime Birthday { get; set; }
        public string SocialUrl { get; set; }

        //FK
        public int? ActivityId { get; set; }
        public Activity Activity { get; set; }
        public int? InstitutionId { get; set; }
        public Institution Institution { get; set; }

        public Guest() {}
        public Guest(int id, string first_name, string last_name, string email, string phone, DateTime birthday, string social_url, int? activity_id, int? institution_id)
        {
            this.Id = id;
            this.FirstName = first_name;
            this.LastName = last_name;
            this.Email = email;
            this.Phone = phone;
            this.Birthday = birthday;
            this.SocialUrl = social_url;
            this.ActivityId = activity_id;
            this.InstitutionId = institution_id;
        }

    }
}