using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Auth
{
    public class ApplicationUser
    {
        public int Id { get; set; }

        [Required]
        [StringLength(256)]
        public string Email { get; set; } = string.Empty;
        
        [Required]
        public byte[] PasswordHash { get; set; }

        [Required]
        public byte[] PasswordSalt { get; set; }
    }
}
