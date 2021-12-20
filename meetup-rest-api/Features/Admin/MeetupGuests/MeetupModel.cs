using meetup_rest_api.Core.Entity;

namespace meetup_rest_api.Features.Admin.Meetup_Guests
{
    public class MeetupModel
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime BeginningAt { get; set; }
        public List<GuestModel> Guests { get; set; }


        internal static MeetupModel ToMeetupModel(Meetup meetup, List<GuestModel> guests) {
            return new MeetupModel() {
                Id = meetup.Id,
                Title = meetup.Title,
                BeginningAt = meetup.BeginningAt,
                Guests = guests
            };
        }

    }
}