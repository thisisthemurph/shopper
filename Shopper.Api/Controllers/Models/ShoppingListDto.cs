using Shopper.Api.Models;

namespace Shopper.Api.Controllers.Models
{
    public class ShoppingListDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public string? Settings { get; set; }
        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }

        public List<ShoppingListItemDto> Items { get; set; }

        public ShoppingListDto() { }

        public ShoppingListDto(ShoppingList model)
        {
            Id = model.Id;
            Name = model.Name;
            Description = model.Description;
            Settings = model.Settings;
            CreatedAt = model.CreatedAt;
            UpdatedAt = model.UpdatedAt;

            if (model.Items == null)
            {
                Items = new List<ShoppingListItemDto>();
            } else
            {
                Items = model.Items.Select(x => new ShoppingListItemDto(x)).ToList();
            }
        }
    }
}
