using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Auth
{
    public class UserPasswordResetRequestDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}
