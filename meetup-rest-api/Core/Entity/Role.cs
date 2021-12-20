using System.ComponentModel.DataAnnotations.Schema;

namespace meetup_rest_api.Core.Entity
{   
    [Table("roles")]
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public Role(){}
        public Role(int id, string name) {
            this.Id = id;
            this.Name = name;
        }
    }
}