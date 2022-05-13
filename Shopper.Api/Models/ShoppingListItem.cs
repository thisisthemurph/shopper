using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Models
{
    public class ShoppingListItem
    {
        public int Id { get; set; }

        [Required, StringLength(50)]
        public string Name { get; set; }

        [DefaultValue(null)]
        public ShoppingListItemCategory? Category { get; set; } = null;

        [DefaultValue(ShoppingListItemStatus.Unchecked)]
        public ShoppingListItemStatus Status { get; set; } = ShoppingListItemStatus.Unchecked;
        public ShoppingList ShoppingList { get; set; }
    }
}
