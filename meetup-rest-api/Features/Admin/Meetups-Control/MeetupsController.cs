using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using meetup_rest_api.Core.Entity;
using Microsoft.AspNetCore.Authorization;

namespace meetup_rest_api.Features.Admin.Meetups_Control
{
    [Authorize(Roles="Admin")]
    [Route("api/admin/meetups")]
    [ApiController]
    public class MeetupControlController : ControllerBase
    {
        private MeetupContext meetupContext;

        public MeetupControlController(MeetupContext meetupContext)
        {
            this.meetupContext = meetupContext;
        }

        [HttpGet("")]
        public List<MeetupModel> GetMeetups()
        {   
            return meetupContext.Meetups.Select(t => MeetupModel.FromEntity(t, meetupContext.MeetupGuests.Where(m => m.MeetupId == t.Id).Count())).ToList();
        }
        [HttpPost]
        public ActionResult<Meetup> CreateMeetup(Meetup meetup)
        {
            if (meetupContext.Meetups.Where(x => x.Slug == meetup.Slug).Count() == 0)
            {
                Meetup newMeetup = new Meetup(0, meetup.Title, meetup.ShortDescription, meetup.LongDescription,
                meetup.BeginningAt.ToUniversalTime(), meetup.Duration, meetup.RegistrationDeadline.ToUniversalTime(), meetup.ImageId,
                meetup.Status, meetup.Location, meetup.Slug);
                meetupContext.Meetups.Add(newMeetup);
                meetupContext.SaveChanges();
                return newMeetup;
            }
            else
                return StatusCode(400);
        }
        [HttpPatch]
        public ActionResult<Meetup> UpdateMeetup(Meetup meetup)
        {
            Meetup oldmeetup = meetupContext.Meetups.Find(meetup.Id);
            if (oldmeetup.Slug == meetup.Slug)
            {
                if (meetupContext.Meetups.Where(x => x.Slug == meetup.Slug).Count() == 1)
                {
                    oldmeetup.Duration = meetup.Duration;
                    oldmeetup.Title = meetup.Title;
                    oldmeetup.ShortDescription = meetup.ShortDescription;
                    oldmeetup.LongDescription = meetup.LongDescription;
                    oldmeetup.Location = meetup.Location;
                    oldmeetup.ImageId = meetup.ImageId;
                    oldmeetup.Slug = meetup.Slug;
                    oldmeetup.Status = meetup.Status;
                    oldmeetup.RegistrationDeadline = meetup.RegistrationDeadline.ToUniversalTime();
                    oldmeetup.BeginningAt = meetup.BeginningAt.ToUniversalTime();
                    meetupContext.SaveChanges();
                    return oldmeetup;
                }
                else
                    return StatusCode(400);
            }
            else
            {
                if(meetupContext.Meetups.Where(x => x.Slug == meetup.Slug).Count() == 0 )
                {
                    oldmeetup.Duration = meetup.Duration;
                    oldmeetup.Title = meetup.Title;
                    oldmeetup.ShortDescription = meetup.ShortDescription;
                    oldmeetup.LongDescription = meetup.LongDescription;
                    oldmeetup.Location = meetup.Location;
                    oldmeetup.ImageId = meetup.ImageId;
                    oldmeetup.Slug = meetup.Slug;
                    oldmeetup.Status = meetup.Status;
                    oldmeetup.RegistrationDeadline = meetup.RegistrationDeadline.ToUniversalTime();
                    oldmeetup.BeginningAt = meetup.BeginningAt.ToUniversalTime();
                    meetupContext.SaveChanges();
                    return oldmeetup;
                }
                else
                    return StatusCode(400);
            }
        }
        [HttpGet("{id}")]
        public ActionResult<Meetup> GetMeetup(int id)
        {
            return meetupContext.Meetups.Where(x => x.Id == id).Single();
        }

        [HttpPost("/image")]
        public ActionResult PostImage([FromForm] FileModel file)
        {
            try 
            {
                string path = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", file.FileName);
                using(Stream stream = new FileStream(path, FileMode.Create))
                {
                    file.FormFile.CopyTo(stream);
                }
                return StatusCode(StatusCodes.Status201Created);
            }
            catch(Exception) {
                return StatusCode(StatusCodes.Status500InternalServerError);
            }
        }
        
    }
}