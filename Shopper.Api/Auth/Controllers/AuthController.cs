using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using Shopper.Api.Contexts;
using Microsoft.EntityFrameworkCore;
using Shopper.Api.Services;

namespace Shopper.Api.Auth
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IContextService _context;
        private readonly string _jwtTokenSecret;
        private IEmailService _emailService;

        public AuthController(IContextService context, IEmailService emailService, ISercretsService secrets)
        {
            _context = context;
            _emailService = emailService;
            _jwtTokenSecret = secrets.JwtSecret;
        }

        [HttpPost]
        [Route("register")]
        public async Task<ActionResult<UserDto>> Register(UserRegisterDto request)
        {
            // Does the user already exist?
            var foundUser = await _context.Database.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == request.Email);
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

            _context.Database.ApplicationUsers.Add(newUser);
            await _context.Database.SaveChangesAsync();

            return Ok(new UserDto(newUser));
        }

        [HttpPost]
        [Route("login")]
        public async Task<ActionResult<TokenResponseDto>> Login(UserLoginDto request)
        {
            // Does a user exist?
            var foundUser = await _context.Database.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == request.Email);
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

            var token = CreateAuthToken(request);
            var response = new TokenResponseDto
            {
                Data = token,
            };

            return Ok(response);
        }

        [HttpPost]
        [Route("RequestPasswordReset")]
        public async Task<ActionResult> RegisterPasswordReset(UserPasswordResetRequestDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var userExists = (await _context.Database.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == model.Email)) != null;

            if (!userExists)
            {
                // We don't want to inform that the user does not exist
                return Ok();
            }

            var token = CreatePasswordResetToken(model.Email);
            await _emailService.SendPassworResetEmailAsync(model.Email, token);

            return Ok();
        }

        [HttpPost]
        [Route("PasswordReset")]
        public async Task<ActionResult> ActionPasswordReset([FromBody] UserPasswordResetDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            //var secret = _configuration.GetSection("AppSettings:Token").Value;
            var isValidToken = await TokenIsValid(model.Token, _jwtTokenSecret);

            if (!isValidToken)
            {
                return Unauthorized();
            }

            // Get email address from tokem

            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(model.Token);
            var emailClaim = jwtToken.Claims.FirstOrDefault(x => x.Type == ClaimTypes.Email);

            if (emailClaim == null)
            {
                return Unauthorized();
            }

            var email = emailClaim.Value;
            var user = await _context.Database.ApplicationUsers.FirstOrDefaultAsync(x => x.Email == email);

            if (user == null)
            {
                return Unauthorized();
            }

            GeneratePasswordHash(model.Password, out var passwordHash, out var salt);
            user.PasswordHash = passwordHash;
            user.PasswordSalt = salt;

            await _context.Database.SaveChangesAsync();
            return Ok();
        }

        private async Task<bool> TokenIsValid(string token, string secret)
        {
            // https://dotnetcoretutorials.com/2020/01/15/creating-and-validating-jwt-tokens-in-asp-net-core/
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                var validity = await tokenHandler.ValidateTokenAsync(
                    token,
                    new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidateAudience = false,
                        IssuerSigningKey = key
                    });

                return validity.IsValid;
            }
            catch
            {
                return false;
            }
        }

        private string CreatePasswordResetToken(string email)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Email, email),
                new Claim("method", "passwordReset"),
            };

            return CreateToken(claims, _jwtTokenSecret, DateTime.Now.AddHours(1));
        }

        private string CreateAuthToken(UserLoginDto user)
        {
            List<Claim> claims = new()
            {
                new Claim(ClaimTypes.Email, user.Email),
            };

            return CreateToken(claims, _jwtTokenSecret);
        }

        private string CreateToken(IEnumerable<Claim> claims, string secret, DateTime? expiration = null)
        {
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secret));

            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var token = new JwtSecurityToken(
                claims: claims,
                expires: expiration ?? DateTime.Now.AddDays(1),
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
