using System.ComponentModel.DataAnnotations;

namespace ITDIV.Models.Requests
{
    public class CreateUserRequest
    {
        [Required(ErrorMessage = "Name is required.")]
        public string Name { get; set; }
        [Required(ErrorMessage = "Email is required.")]
        [EmailAddress]
        public string Email { get; set; }
        [Required(ErrorMessage = "Password is required.")]
        [MinLength(8)]
        public string Passwords { get; set; }
        [Required(ErrorMessage = "Confirm password is required.")]
        [Compare("Passwords", ErrorMessage = "Password doesn't match.")]
        public string ConfirmPasswords { get; set; }
    }
}
