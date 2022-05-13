using System.ComponentModel.DataAnnotations;

namespace Shopper.Api.Models
{
    public class ShoppingListItemCategory
    {
        public int Id { get; set; }

        [Required, StringLength(25)]
        public string Name { get; set; }
    }
}
