using System.ComponentModel.DataAnnotations.Schema;

namespace meetup_rest_api.Core.Entity
{
    [Table("institutions")]
    public class Institution
    {
        public int Id { get; set; }
        public string Name { get; set; }
        
        public Institution() {}
        public Institution(int id, string name) {
            this.Id = id;
            this.Name = name;
        }
    }
}