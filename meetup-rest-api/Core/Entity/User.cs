using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace meetup_rest_api.Core.Entity
{   
    [Table("users")]
    public class User
    {
        public int Id { get; set; }
        
        [Required]
        public string Email { get; set; }
        public string Password { get; set; }

        //FK
        public int? RoleId { get; set; }
        public Role Role { get; set; }
        public int GuestId { get; set; }
        public Guest Guest { get; set; }

        public User(){}
        public User(int id, string email, string password, int? role_id, int guest_id)
        {
            this.Id = id;
            this.Email = email;
            this.Password = password;
            this.RoleId = role_id;
            this.GuestId = guest_id;
        }
    }
}