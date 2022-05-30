using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Auth
{
    public class UserLoginDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [MinLength(8, ErrorMessage = "The password doe not meet the minimum complexity requirements.")]
        public string Password { get; set; } = string.Empty;
    }
}
