using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

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

        [JsonIgnore]
        public ShoppingList ShoppingList { get; set; }
    }
}
