using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Controllers.Models
{
    public class ShoppingListCreateWithDatesDto
    {
        [Required, StringLength(50)]
        public string Name { get; set; }

        [StringLength(150)]
        public string? Description { get; set; }

        [Required]
        public DateTimeOffset CreatedAt { get; set; }

        [Required]
        public DateTimeOffset UpdatedAt { get; set; }

        public ShoppingListCreateWithDatesDto(ShoppingListCreateDto model)
        {
            this.Name = model.Name;
            this.Description = model.Description;
            this.CreatedAt = DateTimeOffset.Now;
            this.UpdatedAt = DateTimeOffset.Now;
        }
    }
}
