using ITDIV.Models.Requests;
using ITDIV.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ITDIV.Data;
using ITDIV.Models.Results;

namespace ITDIV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly AppDbContext _context;

        public CategoryController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("CategoryList{UserID}")]
        public async Task<ActionResult<IEnumerable<GetCategoryResult>>> Get(Guid UserID)
        {
            var users = await _context.Category.Select(x => new GetCategoryResult()
            {
                UserID = x.UserID,
                CategoryID = x.CategoryID,
                CategoryName = x.CategoryName,
            }).OrderBy(x => x.CategoryID).Where(x => x.UserID == UserID).ToListAsync();

            var response = new ApiResponseCat<GetCategoryResult>
            {
                Payload = users
            };
            return Ok(response);

        }

        [HttpPost("AddCategory{UserID}")]
        public async Task<IActionResult> AddCategory(Guid UserID, [FromBody] CreateCategoryRequest createCategoryRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var checkUsers = _context.Users.Where(x => x.UserID == UserID).Count();

            if(checkUsers == 0)
            {
                return NotFound("UserID Not Found");
            }

            var category = new Category
            {   
                UserID = UserID,
                CategoryName = createCategoryRequest.CategoryName
            };

            _context.Category.Add(category);
            await _context.SaveChangesAsync();

            return Ok("Category Successfully Added");
        }

        [HttpPut("UpdateCategory{CategoryID}")]
        public async Task<IActionResult> UpdateCategory(int CategoryID ,[FromBody] UpdateCategoryRequest updateCategoryRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var checkCategory = await _context.Category.FirstOrDefaultAsync(s => s.CategoryID == CategoryID);

            if (checkCategory == null)
            {
                return NotFound("CategoryID Not Found");
            }

            checkCategory.CategoryName = updateCategoryRequest.CategoryName;

            await _context.SaveChangesAsync();

            return Ok("Category Successfully Edited");
        }

        [HttpDelete("DeleteCategory{CategoryID}")]
        public async Task<IActionResult> Delete(int CategoryID)
        {
            var deleteCategory = await _context.Category.FirstOrDefaultAsync(s => s.CategoryID == CategoryID);

            if (deleteCategory == null)
            {
                return NotFound("CategoryID Not Found");
            }

            _context.Category.Remove(deleteCategory);
            await _context.SaveChangesAsync();

            return Ok("Category Successfully Removed");
        }


    }
}
