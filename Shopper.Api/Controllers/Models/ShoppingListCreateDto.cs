using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Controllers.Models
{
    public class ShoppingListCreateDto
    {
        [Required, StringLength(50)]
        public string Name { get; set; }

        [StringLength(150)]
        public string? Description { get; set; }
    }
}
