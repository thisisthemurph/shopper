using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Shopper.Api.Contexts;
using Shopper.Api.Controllers.Models;
using Shopper.Api.Models;

namespace Shopper.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ShoppingListController : ControllerBase
    {
        private readonly ShoppingListContext _context;
        public ShoppingListController()
        {
            _context = new ShoppingListContext();
        }

        [HttpGet]
        public async Task<IActionResult> GetAllShoppingLists()
        {
            return Ok(await _context.ShoppingLists.ToListAsync());
        }

        [HttpGet("{listId}")]
        public async Task<ActionResult> GetShoppingList(int listId)
        {
            var foundList = await _context.ShoppingLists
                .Include(list => list.Items)
                .FirstOrDefaultAsync(list => list.Id == listId);

            if (foundList == null)
            {
                return NotFound($"Shopping list with ID {listId} could not be found");
            }

            return Ok(new ShoppingListDto(foundList));
        }

        [HttpPost]
        public async Task<ActionResult> CreateShoppingList(ShoppingListCreateDto shoppingList)
        {
            var newShoppingList = new ShoppingList
            {
                Name = shoppingList.Name,
                Description = shoppingList.Description,
                CreatedAt = DateTimeOffset.Now,
                UpdatedAt = DateTimeOffset.Now
            };

            _context.ShoppingLists.Add(newShoppingList);
            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetShoppingList), 
                new { ListId = newShoppingList.Id }, 
                new ShoppingListDto(newShoppingList));
        }

        [HttpPost("{listId}/item")]
        public async Task<ActionResult> AddShoppingListItem(int listId, ShoppingListItemCreateDto shoppingListItem)
        {
            var shoppingList = await _context.ShoppingLists
                .Include(list => list.Items)
                .FirstOrDefaultAsync(list => list.Id == listId);

            if (shoppingList == null)
            {
                return BadRequest($"A shopping list with ID {listId} could not be found.");
            }

            var item = new ShoppingListItem
            {
                Name = shoppingListItem.Name,
            };

            shoppingList.Items.Add(item);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetShoppingList), new { ListId = shoppingList.Id }, null);
        }

        [HttpPut("{listId}")]
        public async Task<ActionResult> UpdateList(int listId, ShoppingListCreateDto newDetails)
        {
            var shoppingList = _context.ShoppingLists.FirstOrDefault(x => x.Id == listId);

            if (shoppingList == null)
            {
                return NotFound($"A shopping list with the ID {listId} could not be found.");
            }

            shoppingList.Name = newDetails.Name;
            shoppingList.Description = newDetails.Description;
            shoppingList.UpdatedAt = DateTimeOffset.Now;

            await _context.SaveChangesAsync();
            return Ok(new ShoppingListDto(shoppingList));
        }

        [HttpDelete("listId")]
        public async Task<ActionResult> Delete(int listId)
        {
            var foundList = _context.ShoppingLists.FirstOrDefault(x => x.Id == listId);

            if (foundList == null)
            {
                return NotFound($"A shopping list with ID {listId} could not be found.");
            }

            _context.ShoppingLists.Remove(foundList);
            await _context.SaveChangesAsync();

            return Ok(new ShoppingListDto(foundList));
        }
    }
}
