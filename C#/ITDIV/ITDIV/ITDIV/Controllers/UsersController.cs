using ITDIV.Data;
using ITDIV.Models;
using ITDIV.Models.Requests;
using ITDIV.Models.Results;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.RegularExpressions;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace ITDIV.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        //GET api/<UsersController>
        [HttpGet("Lists")]
        public async Task<ActionResult<IEnumerable<GetUserResult>>> Get()
        {
            var users = await _context.Users.OrderBy(x => x.UserID).Select(x => new GetUserResult()
            {
                UserID = x.UserID,
                Name = x.Name,
                Email = x.Email,
                Passwords = x.Passwords,
            }).ToListAsync();

            var response = new ApiResponse<GetUserResult>
            {
                StatusCode = StatusCodes.Status200OK,
                RequestMethod = HttpContext.Request.Method,
                Payload = users
            };
           return Ok(response);

        }

        // POST api/<UsersController>
        [HttpPost("Register")]
        public async Task<IActionResult> Register([FromBody] CreateUserRequest createUserRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (!Regex.IsMatch(createUserRequest.Email, @"^[^@\s]+@[^@\s]+.[^@\s]+$", RegexOptions.IgnoreCase, TimeSpan.FromMilliseconds(250)))
            {
                return NotFound("Invalid Email Address");
            }

            if (createUserRequest.Passwords.Length < 8)
            {
                return NotFound("Password must be 8 characters");
            }

            if (!Regex.IsMatch(createUserRequest.Passwords, "[A-Z]"))
            {
                return NotFound("Password must be at least one uppercase letter");
            }

            if (!Regex.IsMatch(createUserRequest.Passwords, @"\d"))
            {
                return NotFound("Password must be at least one number digit");
            }

            if (!Regex.IsMatch(createUserRequest.Passwords, @"[!@#$%^&*()_+=\[{\]};:<>|./?,-]"))
            {
                return NotFound("Password must be at least one symbol");
            }

            if (createUserRequest.Passwords != createUserRequest.ConfirmPasswords)
            {
                return NotFound("Password doesn't Match");
            }

            var checkUsers = _context.Users.Where(x => x.Email == createUserRequest.Email).Count();

            if (checkUsers > 0)
            {
                return NotFound("User Already Exists");
            }

            var users = new Users
            {
                UserID = Guid.NewGuid(),
                Name = createUserRequest.Name,
                Email = createUserRequest.Email,
                Passwords = createUserRequest.Passwords
            };

            _context.Users.Add(users);
            await _context.SaveChangesAsync();

            return Ok("User Successfully Added");
        }
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] GetUserRequest getUserRequest)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var checkUser = await _context.Users.SingleOrDefaultAsync(x => x.Email == getUserRequest.Email);

            if (checkUser == null)
            {
                return NotFound("Invalid Email Address");

            }

            if (checkUser.Passwords != getUserRequest.Passwords)
            {
                return NotFound("Wrong Password");
            }

            return Ok(checkUser);
        }
    }
}
