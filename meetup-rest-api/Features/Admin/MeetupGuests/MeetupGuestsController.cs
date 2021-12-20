using System.Collections.Generic;
using System.Linq;
using meetup_rest_api.Core.Entity;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace meetup_rest_api.Features.Admin.Meetup_Guests
{
    [Authorize(Roles = "Admin")]
    [Route("api/admin/meetup")]
    [ApiController]
    public class MeetupGuestsController : ControllerBase
    {
        private readonly MeetupContext _context;

        public MeetupGuestsController(MeetupContext context)
        {
            this._context = context;
        }

        [HttpGet("{meetupId}/guests")]
        public MeetupModel GetMeetupGuests(int meetupId)
        {
            Meetup meetup = _context.Meetups.Single(meetups => meetups.Id == meetupId);
            // if(meetup == null)
            // {
            //     return;
            // }

            var guests = _context.MeetupGuests
                .Where(g => g.MeetupId == meetupId )
                .Select(g => new GuestModel() {
                    Id = g.Id,
                    FirstName = g.Guest.FirstName,
                    LastName = g.Guest.LastName,
                    Email = g.Guest.Email,
                    Phone = g.Guest.Phone,
                    Birthday = g.Guest.Birthday,
                    Create_at = g.CreatedAt,
                    SocialUrl = g.Guest.SocialUrl,
                    Activity = g.Activity.Name,
                    Institution = g.Institution.Name,
                    Status = g.Status
                })
                .ToList();

           
            return MeetupModel.ToMeetupModel(meetup, guests);
        }
    }
}