using System;
using System.ComponentModel.DataAnnotations;

namespace meetup_rest_api.Features.Public.RegistrationTemplate
{
    public class RegistrationModel
    {
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "It is not an email")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password is required")]
        public string Password { get; set; }

        [Required(ErrorMessage = "First name is required")]
        public string First_name { get; set; }

        [Required(ErrorMessage = "Last name is required")]
        public string Last_name { get; set; }

        [Required(ErrorMessage = "Birthday is required")]
        public DateTime Birthday { get; set; }

        [Required(ErrorMessage = "Phone is required")]
        [Phone(ErrorMessage = "It is not a phone number")]
        public string Phone { get; set; }

        [Required(ErrorMessage = "Activity is required")]
        public string Activity {get; set;}

        public string Institution { get; set; }

        public RegistrationModel() {

        }

        public RegistrationModel(string email, string password, string first_name, string last_name, DateTime birthday, string phone, string activity, string institution)
        {
            this.Email = email;
            this.Password = password;
            this.First_name = first_name;
            this.Last_name = last_name;
            this.Birthday = birthday;
            this.Phone = phone;
            this.Activity = activity;
            this.Institution = institution;
        }
    }
}