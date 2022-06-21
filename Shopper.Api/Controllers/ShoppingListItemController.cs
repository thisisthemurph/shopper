using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopper.Api.ActionFilters;
using Shopper.Api.Contexts;
using Shopper.Api.Controllers.Models;
using Shopper.Api.Extensions;
using Shopper.Api.Models;
using Shopper.Api.Services;

namespace Shopper.Api.Controllers
{
    [ApiController]
    [Route("api/ShoppingList/{shoppingListId}/Item")]
    [Authorize]
    public class ShoppingListItemController : ControllerBase
    {
        private readonly IContextService _context;

        public ShoppingListItemController(IContextService contextService)
        {
            _context = contextService ?? throw new ArgumentNullException(nameof(contextService));
        }

        [HttpPut("{itemId}")]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListItemDto>> UpdateItem(
            int shoppingListId, int itemId, ShoppingListItemUpdateDto data, CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();
            var list = await _context.Database.ShoppingLists
                .Include(x => x.Items)
                .FirstOrDefaultAsync(
                    x => x.Id == shoppingListId && x.User == user, 
                    cancellationToken);

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
            await _context.Database.SaveChangesAsync(cancellationToken);

            return Ok(new ShoppingListItemDto(item));
        }

        [HttpPut("{itemId}/status")]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListItemDto>> UpdateItemStatus(
            int shoppingListId, int itemId, ShoppingListItemStatus status, CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();
            var list = await _context.Database.ShoppingLists
                .Include(x => x.Items)
                .FirstOrDefaultAsync(
                    x => x.Id == shoppingListId && x.User == user,
                    cancellationToken);

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
            await _context.Database.SaveChangesAsync(cancellationToken);

            return Ok(new ShoppingListItemDto(item));
        }
    }
}
