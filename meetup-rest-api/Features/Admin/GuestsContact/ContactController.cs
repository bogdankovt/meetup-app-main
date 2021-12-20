using System.Linq;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace meetup_rest_api.Features.Admin.Guests
{
    [Authorize(Roles ="Admin")]
    [Route("api/admin/contacts")]
    [ApiController]
    public class ContactController : ControllerBase
    {


        private readonly MeetupContext _context;

        public ContactController(MeetupContext context)
        {
            this._context = context;
        }

        [HttpGet]
        public IActionResult GetContacts()
        {
            var result =  _context.Guests.Include(guest => guest.Activity)
            .Include(guest => guest.Institution)
            .Select(guest => ContactModel.ToContactModelDto(guest))
            .ToList().OrderBy(guest => guest.FirstName);

            return new JsonResult(result);

        }
    }
}