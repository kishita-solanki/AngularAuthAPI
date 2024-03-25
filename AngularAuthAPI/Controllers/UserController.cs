using AngularAuthAPI.Context;
using AngularAuthAPI.Helpers;
using AngularAuthAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text;
using System.Text.RegularExpressions;

namespace AngularAuthAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    // [EnableCors("CorsPolicy")]
    public class UserController : ControllerBase
    {
        private readonly AppdbContext _authContext;
        public UserController(AppdbContext appdbContext)
        {
            _authContext = appdbContext;
        }

        [HttpPost("authenticate")]
        public async Task<IActionResult> Authenticate([FromBody] User userrequest)
        {
            if (userrequest == null) return BadRequest();

            var user = await _authContext.Users.FirstOrDefaultAsync(x => x.Username == userrequest.Username);

            if (user == null) return NotFound(new {Message = "User not found"});

            if (!PasswordHasher.VerifyPassword(userrequest.Password, user.Password)) return BadRequest(new { Message = "Password is incorrect" });

            return Ok(new {Message = "User login successfully!!"});
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser([FromBody] User userrequest)
        {
            if(userrequest == null) return BadRequest();
            if(await CheckUserNameExistsAsync(userrequest.Username)) return BadRequest(new {Message = "Username already exists"});
            if (await CheckEmailExistsAsync(userrequest.Email)) return BadRequest(new { Message = "Email already exists" });

            var pass = CheckPasswordStrength(userrequest.Password);
            if (!string.IsNullOrEmpty(pass)) return BadRequest(new { Message = pass.ToString() });

            userrequest.Password = PasswordHasher.HashPassword(userrequest.Password);
            userrequest.Role = "User";
            userrequest.Token = "";

            await _authContext.Users.AddAsync(userrequest);
            await _authContext.SaveChangesAsync();

            return Ok(new {Message = "User register successfully!!"});
        }

        private Task<bool> CheckUserNameExistsAsync(string username) 
            => _authContext.Users.AnyAsync(x => x.Username == username);

        private Task<bool> CheckEmailExistsAsync(string email)
            => _authContext.Users.AnyAsync(x => x.Email == email);

        private string CheckPasswordStrength(string Password){
            StringBuilder sb = new StringBuilder();
            if(Password.Length < 8)
                sb.Append("Miimum Password length should must be 8" + Environment.NewLine);

            if (!(Regex.IsMatch(Password,"[a-z]") && Regex.IsMatch(Password, "[A-Z]") && Regex.IsMatch(Password, "[0-9]")))
                sb.Append("Password should be alphanumeric" + Environment.NewLine);

            if (!Regex.IsMatch(Password, "[<, >, @,!,#, $, %, ^, &, *, (,),, +,\\[,\\],{,},?,:,;,,',\\,,,,,,=]"))
                sb.Append("Password should contains special characters" + Environment.NewLine);

            return sb.ToString();
        }
    }
}
