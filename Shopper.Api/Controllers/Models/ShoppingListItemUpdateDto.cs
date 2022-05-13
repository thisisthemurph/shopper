using Shopper.Api.Models;

namespace Shopper.Api.Controllers.Models
{
    public class ShoppingListItemUpdateDto
    {
        public string Name { get; set; }
        public ShoppingListItemCategory? Category { get; set; } = null;
        public ShoppingListItemStatus Status { get; set; } = ShoppingListItemStatus.Unchecked;
    }
}
