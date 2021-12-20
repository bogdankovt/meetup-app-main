using System;
using Microsoft.AspNetCore.Mvc;
using BCrypt;

namespace meetup_rest_api.Features.Public.RegistrationTemplate
{
    [Route("/api/registration")]
    [ApiController]
    public class RegistrationController : ControllerBase
    {
        private MeetupContext _context;
        private const string GuestRole = "Guest";
        private const int DefaultId = 0;

        // private const int GuestRoleId = 1;
        // private const int VisitEducationInstitutionId = 1;
        // private Dictionary<string, int> activities = new Dictionary<string, int> {
        //     {"Відвідую ВНЗ", VisitEducationInstitutionId},
        //     {"Працюю в IT", 2},
        //     {"Хочу в IT", 3}
        // };

        // private Dictionary<string, int> institutions = new Dictionary<string, int> {
        //     {"ЧНУ", 1},
        //     {"ЧДТУ", 2},
        //     {"ЧДБК", 3}
        // };

        public RegistrationController(MeetupContext context)
        {
            this._context = context;
        }

        private string hashPassword(string password)
        {
            return BCrypt.Net.BCrypt.HashPassword(password);
        }

        private string convertPhoneNumber(string phone)
        {
            string newPhoneNumber = "";
            if (phone.Length == 6)
            {
                newPhoneNumber = "0472" + phone;
            }
            else if (phone.Length > 10)
            {
                newPhoneNumber = phone.Remove(0, phone.Length - 10);
            }
            else newPhoneNumber = phone;
            return newPhoneNumber;
        }

        [HttpPost]
        public ActionResult<AuthorizationModel> SignUp(RegistrationModel data)
        {
            try
            {
                if (_context.Users.Where(user => user.Email == data.Email).Count() > 0)
                {
                    return BadRequest("Ця електронна пошта вже використовується.");
                }

                // int activityId = DefaultId;
                // int institutionId = DefaultId;

                // try
                // {
                //     activityId = activities[data.Activity];
                // }
                // catch { }

                // if (activityId == VisitEducationInstitutionId)
                // {
                //     try
                //     {
                //         institutionId = institutions[data.Institution];
                //     }
                //     catch { }
                // }

                int activityId = _context.Activities.Where(activity => activity.Name == data.Activity).Select(activity => activity.Id).ToList().FirstOrDefault(DefaultId);
                int institutionId = _context.Institutions.Where(institution => institution.Name == data.Institution).Select(institution => institution.Id).ToList().FirstOrDefault(DefaultId);
                int roleId = _context.Roles.Where(role => role.Name == GuestRole).Select(role => role.Id).ToList().FirstOrDefault(DefaultId);

                Core.Entity.Guest newGuest = new Core.Entity.Guest();
                newGuest.Id = 0;
                newGuest.FirstName = data.First_name;
                newGuest.LastName = data.Last_name;
                newGuest.Email = data.Email;
                newGuest.Phone = convertPhoneNumber(data.Phone);
                newGuest.Birthday = data.Birthday.ToUniversalTime();
                newGuest.SocialUrl = "";
                newGuest.ActivityId = (activityId != 0) ? activityId : null;
                newGuest.InstitutionId = (institutionId != 0) ? institutionId : null;
                _context.Guests.Add(newGuest);
                
                int countOfAddedEntities = _context.SaveChanges();
                if (countOfAddedEntities != 1)
                {
                    return StatusCode(500, "Сутність не була додана до таблиці 'Guests'");
                }

                _context.Users.Add(new Core.Entity.User(
                    0, 
                    data.Email, 
                    hashPassword(data.Password), 
                    (roleId != 0) ? roleId: null, 
                    newGuest.Id));
                countOfAddedEntities = _context.SaveChanges();

                if (countOfAddedEntities == 1)
                {
                    return StatusCode(201, new AuthorizationModel(data.Email, data.Password));
                }
                else
                {
                    return StatusCode(500, "Сутність не була додана до таблиці 'Users'");
                }
            }
            catch
            {
                return StatusCode(500, "Помилка запиту до бази даних");
            }
        }
    }
}