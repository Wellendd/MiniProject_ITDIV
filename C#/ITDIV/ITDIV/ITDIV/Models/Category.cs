using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ITDIV.Models
{
    public class Category
    {
        [Key]
        public int CategoryID { get; set; }

        [MaxLength(255)]
        public string CategoryName { get; set; }
        [ForeignKey("Users")]
        public Guid UserID { get; set; } 
        public Users Users { get; set; }
    }
}
