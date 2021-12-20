using Microsoft.AspNetCore.Mvc;
using meetup_rest_api.Core.Entity;
using meetup_rest_api.Features.Public.Login;
using meetup_rest_api.Features._Guest.MeetupRegistration.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;

namespace meetup_rest_api.Features._Guest.MeetupRegistration.Controllers
{

    [Authorize(Roles ="Guest")]
    [Route("api/guest/meetup/{slug}/registration")]
    [ApiController]
    public class MeetupRegistrationController : ControllerBase
    {
        private MeetupContext _context;
        public UserService _userService;

        public MeetupRegistrationController(MeetupContext context, UserService userService)
        {
            this._context = context;
            this._userService = userService;
        }

        private void RegistrationOnMeetup(MeetupGuest newGuest)
        {
            _context.MeetupGuests.Add(newGuest);
            _context.SaveChanges();
        }

        private Meetup GetMeetupBySlug(string slug) 
        {
            var meetup = _context.Meetups
                .Where(meetup => meetup.Slug == slug)
                .SingleOrDefault();

            return meetup;
        }
        
        [HttpPost]
        public ActionResult<MeetupGuestStatus> RegisterUserToMeetup( string slug, Source source )
        {   
            var meetup = GetMeetupBySlug(slug);
            var user = GetUser(_userService.CurrentUserId);

            if(meetup != null && user != null) 
            {
                DateTime actualDateTime = DateTime.Now.ToUniversalTime();
                MeetupGuest newGuest = new MeetupGuest(0, meetup.Id, user.GuestId, user.Guest.ActivityId, user.Guest.InstitutionId, "Registered", actualDateTime, source.source);
                RegistrationOnMeetup(newGuest);

                return new MeetupGuestStatus(newGuest);
            }
            
            return NotFound();
        }

        private User GetUser(int currentUserId)
        {
            var user = _context.Users.Where(user => user.Id == currentUserId)
            .Include(user => user.Guest)
            .SingleOrDefault();
            return user;
        }
    }
}