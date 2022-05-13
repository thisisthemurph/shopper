using Shopper.Api.Models;

namespace Shopper.Api.Controllers.Models
{
    public class ShoppingListItemDto
    {
        public int Id { get; set; }
        public int ListId { get; set; }
        public string Name { get; set; }
        public ShoppingListItemCategory? Category { get; set; }
        public ShoppingListItemStatus Status { get; set; }

        public ShoppingListItemDto() { }

        public ShoppingListItemDto(ShoppingListItem model)
        {
            Id = model.Id;
            ListId = model.ShoppingList.Id;
            Name = model.Name;
            Category = model.Category;
            Status = model.Status;
        }
    }
}
