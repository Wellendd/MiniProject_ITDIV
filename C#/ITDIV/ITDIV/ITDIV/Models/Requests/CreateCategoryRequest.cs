using System.ComponentModel.DataAnnotations;

namespace ITDIV.Models.Requests
{
    public class CreateCategoryRequest
    {

        [Required(ErrorMessage = "Categoryname is required.")]
        public string CategoryName { get; set; }
    }
}
