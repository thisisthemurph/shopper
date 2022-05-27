using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Auth
{
    public class UserDto
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        public UserDto() {}

        public UserDto(ApplicationUser model)
        {
            Email = model.Email;
        }
    }
}
