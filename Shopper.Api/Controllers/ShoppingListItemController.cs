using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopper.Api.Contexts;
using Shopper.Api.Controllers.Models;
using Shopper.Api.Models;
using Shopper.Api.Services;

namespace Shopper.Api.Controllers
{
    [ApiController]
    [Route("api/ShoppingList/{shoppingListId}/Item")]
    public class ShoppingListItemController : ControllerBase
    {
        private readonly IContextService _context;

        public ShoppingListItemController(IContextService contextService)
        {
            _context = contextService ?? throw new ArgumentNullException(nameof(contextService));
        }

        [HttpPut("{itemId}")]
        public async Task<IActionResult> UpdateItem(int shoppingListId, int itemId, ShoppingListItemUpdateDto data)
        {
            var list = await _context.Database.ShoppingLists
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == shoppingListId);

            if (list == null)
            {
                return NotFound($"A shopping list with the ID {shoppingListId} could not be found");
            }

            var item = list.Items.FirstOrDefault(x => x.Id == itemId);

            if (item == null)
            {
                return BadRequest($"An item with ID {itemId} could not be found");
            }

            item.Name = data.Name;
            await _context.Database.SaveChangesAsync();

            return Ok(new ShoppingListItemDto(item));
        }

        [HttpPut("{itemId}/status")]
        public async Task<IActionResult> UpdateItemStatus(int shoppingListId, int itemId, ShoppingListItemStatus status)
        {
            var list = await _context.Database.ShoppingLists
                .Include(x => x.Items)
                .FirstOrDefaultAsync(x => x.Id == shoppingListId);

            if (list == null)
            {
                return NotFound($"A shopping list with the ID {shoppingListId} could not be found");
            }

            var item = list.Items.FirstOrDefault(x => x.Id == itemId);

            if (item == null)
            {
                return BadRequest($"An item with ID {itemId} could not be found");
            }

            item.Status = status;
            await _context.Database.SaveChangesAsync();

            return Ok();
        }
    }
}
