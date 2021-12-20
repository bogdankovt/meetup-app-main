using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using meetup_rest_api.Core.Entity;
using Microsoft.AspNetCore.Authorization;

namespace meetup_rest_api.Features.Admin.Statistics
{
    [Authorize(Roles ="Admin")]
    [Route("api/admin/statistics")]
    [ApiController]
    public class StatisticsController : ControllerBase
    {   
        private MeetupContext _meetupContext;

        public StatisticsController(MeetupContext meetupContext)
        {
            _meetupContext = meetupContext;
        }

        [HttpGet("")]
        public List<StatisticsModel> GetDashboard()
        {
            var stats = _meetupContext.MeetupGuests
                .Include(r => r.Guest).ThenInclude(r => r.Activity)
                .Include(r => r.Guest).ThenInclude(r => r.Institution)
                .ToList()
                .GroupBy(r => r.MeetupId)
                .ToDictionary(r => r.Key, r => r.Aggregate(new StatisticsModel(), (stats, reg) => stats.CountGuest(reg)));

            return _meetupContext.Meetups
                .OrderByDescending(m => m.BeginningAt)
                .Select(m => stats.GetValueOrDefault(m.Id, new StatisticsModel()).FillInfo(m))
                .ToList();
        }
        
    }
}