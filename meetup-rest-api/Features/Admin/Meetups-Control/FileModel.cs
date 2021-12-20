using Microsoft.AspNetCore.Http;

namespace meetup_rest_api.Features.Admin.Meetups_Control
{
    public class FileModel
    {
        public string FileName { get; set; }
        public IFormFile FormFile { get; set; }
    }
}