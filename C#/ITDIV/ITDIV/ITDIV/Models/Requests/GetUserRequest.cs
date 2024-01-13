using System.ComponentModel.DataAnnotations;

namespace ITDIV.Models.Requests
{
    public class GetUserRequest
    {
        [Required]
        public string Email { get; set; }
        [Required]
        public string Passwords { get; set; }
    }
}
