using meetup_rest_api.Core.Entity;

namespace meetup_rest_api.Features._Guest.MeetupRegistration.Models 
{
    public class MeetupGuestStatus
        {
            public string Status { get; set; }

            public MeetupGuestStatus(MeetupGuest guest) {
                this.Status = guest.Status;
            }
        }
}