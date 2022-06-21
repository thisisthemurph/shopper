using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopper.Api.ActionFilters;
using Shopper.Api.Auth;
using Shopper.Api.Controllers.Models;
using Shopper.Api.Extensions;
using Shopper.Api.Models;
using Shopper.Api.Services;

namespace Shopper.Api.Controllers
{

    

    [ApiController]
    [Route("api/[controller]")]
    [Authorize]
    public class ShoppingListController : ControllerBase
    {
        private readonly IContextService _context;

        public ShoppingListController(IContextService contextService)
        {
            _context = contextService ?? throw new ArgumentNullException(nameof(contextService));
        }

        [HttpGet]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<List<ShoppingListDto>>> GetAllShoppingLists(CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();

            var userLists = await _context.Database.ShoppingLists
                .Include(list => list.Items)
                .Where(list => list.User == user)
                .Select(list => new ShoppingListDto(list))
                .ToListAsync(cancellationToken);

            return Ok(userLists);
        }

        [HttpGet("{listId}")]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListDto>> GetShoppingList(int listId, CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();

            var foundList = await _context.Database.ShoppingLists
                .Include(list => list.Items)
                .FirstOrDefaultAsync(
                    list => list.Id == listId && list.User == user, 
                    cancellationToken);

            if (foundList == null)
            {
                return NotFound($"Shopping list with ID {listId} could not be found");
            }

            return Ok(new ShoppingListDto(foundList));
        }

        [HttpPost]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListDto>> CreateShoppingList(ShoppingListCreateDto shoppingList, CancellationToken cancellationToken)
        {
            ApplicationUser? user = this.GetApplicationUser();

            if (user is null)
            {
                return Unauthorized();
            }

            var newShoppingList = new ShoppingList
            {
                Name = shoppingList.Name,
                Description = shoppingList.Description,
                CreatedAt = DateTimeOffset.Now,
                UpdatedAt = DateTimeOffset.Now,
                User = user,
            };

            _context.Database.ShoppingLists.Add(newShoppingList);
            await _context.Database.SaveChangesAsync(cancellationToken);

            return CreatedAtAction(
                nameof(GetShoppingList), 
                new { ListId = newShoppingList.Id }, 
                new ShoppingListDto(newShoppingList));
        }

        [HttpPost("{listId}/item")]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListItemDto>> AddShoppingListItem(
            int listId, ShoppingListItemCreateDto shoppingListItem, CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();

            var shoppingList = await _context.Database.ShoppingLists
                .Include(list => list.Items)
                .FirstOrDefaultAsync(
                    list => list.Id == listId && list.User == user, 
                    cancellationToken);

            if (shoppingList == null)
            {
                return BadRequest($"A shopping list with ID {listId} could not be found.");
            }

            var item = new ShoppingListItem
            {
                Name = shoppingListItem.Name,
            };

            shoppingList.Items.Add(item);
            await _context.Database.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetShoppingList),
                new { ListId = shoppingList.Id },
                new ShoppingListItemDto(item));
        }

        [HttpPut("{listId}")]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListDto>> UpdateList(int listId, ShoppingListCreateDto newDetails, CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();

            var shoppingList = await _context.Database.ShoppingLists
                .FirstOrDefaultAsync(
                    list => list.Id == listId && list.User == user,
                    cancellationToken);

            if (shoppingList == null)
            {
                return NotFound($"A shopping list with the ID {listId} could not be found.");
            }

            shoppingList.Name = newDetails.Name;
            shoppingList.Description = newDetails.Description;
            shoppingList.UpdatedAt = DateTimeOffset.Now;

            await _context.Database.SaveChangesAsync(cancellationToken);
            return Ok(new ShoppingListDto(shoppingList));
        }

        [HttpDelete("listId")]
        [TypeFilter(typeof(ApplicationUserFilter))]
        public async Task<ActionResult<ShoppingListDto>> Delete(int listId, CancellationToken cancellationToken)
        {
            var user = this.GetApplicationUser();

            var foundList = await _context.Database.ShoppingLists
                .FirstOrDefaultAsync(
                    list => list.Id == listId && list.User == user,
                    cancellationToken);

            if (foundList == null)
            {
                return NotFound($"A shopping list with ID {listId} could not be found.");
            }

            _context.Database.ShoppingLists.Remove(foundList);
            await _context.Database.SaveChangesAsync(cancellationToken);

            return Ok(new ShoppingListDto(foundList));
        }
    }
}
