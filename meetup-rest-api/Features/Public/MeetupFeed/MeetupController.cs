using meetup_rest_api.Core.Entity;
using meetup_rest_api.Features.Public.Login;
using Microsoft.AspNetCore.Mvc;

namespace meetup_rest_api.Features.Public.MeetupFeed
{
    [Route("api/public/meetups")]
    [ApiController]
    public class MeetupController : ControllerBase
    {
        private MeetupContext _context;
        public UserService _userService;
        public MeetupController(MeetupContext context, UserService userService)
        {
            this._context = context;
            this._userService = userService;
        }

        private User GetAuthorizedUserInfo(int authId) 
        {
            var user = _context.Users
                .Where(user => user.Id == authId)
                .SingleOrDefault();

            return user;
        }

        private string CheckUserRegistartionOnMeetupStatus(int guestId, int meetupId)
        {
            var meetupGuest = _context.MeetupGuests
                .Where(guest => guest.GuestId == guestId && guest.MeetupId == meetupId)
                .SingleOrDefault();
            if(meetupGuest != null)
            {
                return meetupGuest.Status;
            }
            return "Anonim";
        }

        [HttpGet]
        public ActionResult<List<MeetUpModel>> HomePage()
        {
            List<MeetUpModel> meetups = _context.Meetups.Select(x => new MeetUpModel(x.Title, x.ImageId, x.BeginningAt, x.ShortDescription, x.Status, x.Slug)).ToList();
            return meetups;
        }

        [HttpGet("{slug}")]
        public ActionResult<MeetupDetailsModel> GetMeetupDetails(string slug)
        {
            var meetup = _context.Meetups
                .Where(meetup => meetup.Slug == slug)
                .SingleOrDefault();

            if(meetup != null) 
            {   
                var user = GetAuthorizedUserInfo(_userService.CurrentUserId);
                string registrationStatus = CheckUserRegistartionOnMeetupStatus((user != null ? user.GuestId : 0), meetup.Id);
                MeetupDetailsModel meetupDetails = new MeetupDetailsModel(meetup.Title, meetup.LongDescription, meetup.BeginningAt, meetup.RegistrationDeadline, meetup.Duration, meetup.ImageId, meetup.Status, meetup.Location, meetup.Slug, registrationStatus);

                return meetupDetails;
            }
            return NotFound();
        }
    }
}