using Shopper.Api.Auth;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Models
{
    public class ShoppingList
    {
        public int Id { get; set; }
        public ApplicationUser User { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [DefaultValue(null), StringLength(150)]
        public string? Description { get; set; } = null;

        [DefaultValue(null)]
        public string? Settings { get; set; } = null;
        public List<ShoppingListItem> Items { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
}
