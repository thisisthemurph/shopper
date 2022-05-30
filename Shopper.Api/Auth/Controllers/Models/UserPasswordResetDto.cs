using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Auth
{
    public class UserPasswordResetDto
    {
        [Required]
        public string Password { get; set; }

        [Required]
        public string Token { get; set; }
    }
}
