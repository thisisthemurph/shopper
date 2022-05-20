using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Shopper.Api.Contexts;
using Microsoft.EntityFrameworkCore;

namespace Shopper.Api.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly ShoppingListContext _context;

        public AuthController(IConfiguration configuration, ShoppingListContext context)
        {
            _configuration = configuration;
            _context = context;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<ApplicationUser>> Register(UserRegisterDto request)
        {
            // Does the user already exist?
            var foundUser = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (foundUser != null)
            {
                return BadRequest("A user already exists with the given email address.");
            }

            // Generate the password for the user
            GeneratePasswordHash(
                request.Password, 
                out byte[] passwordHash, 
                out byte[] passwordSalt);

            // Insert the user into the database!
            var newUser = new ApplicationUser
            {
                Email = request.Email,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.ApplicationUsers.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(newUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<string>> Login(UserLoginDto request)
        {
            // Does a user exist?
            var foundUser = await _context.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == request.Email);
            if (foundUser == null)
            {
                return BadRequest("A user with that email address could not be found.");
            }

            // Verify the user's password!
            var passwordVerified = VerifyPasswordHash(
                request.Password, 
                foundUser.PasswordHash, 
                foundUser.PasswordSalt);

            if (!passwordVerified)
            {
                return BadRequest("Wrong password!");
            }

            var token = CreateToken(request);
            return Ok(token);
        }

        private string CreateToken(UserLoginDto user)
        {
            List<Claim> claims = new()
            { 
                new Claim(ClaimTypes.Email, user.Email),
            };

            var secret = _configuration.GetSection("AppSettings:Token").Value;
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddDays(1),
                signingCredentials: credentials);

            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }

        private static void GeneratePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512();
            passwordSalt = hmac.Key;
            passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));
        }

        private static bool VerifyPasswordHash(string password, byte[] passwordHash, byte[] passwordSalt)
        {
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return computedHash.SequenceEqual(passwordHash);
        }
    }
}
