using System.ComponentModel.DataAnnotations;

namespace ITDIV.Models.Requests
{
    public class UpdateCategoryRequest
    {
        [Required]
        public string CategoryName { get; set; }
    }
}
