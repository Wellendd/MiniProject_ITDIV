using System.ComponentModel.DataAnnotations;

namespace ITDIV.Models
{
    public class Users
    {
        [Key]
        public Guid UserID { get; set; }
        [MaxLength(255)]
        public string Name { get; set; }
        [MaxLength(255)]
        public string Email { get; set; }
        [MaxLength(255)]
        public string Passwords { get; set;}
    }
}
