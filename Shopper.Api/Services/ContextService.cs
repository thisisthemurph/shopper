using Shopper.Api.Contexts;

namespace Shopper.Api.Services
{
    public class ContextService : IContextService
    {
        public ShoppingListContext Database { get; }

        public ContextService(ShoppingListContext shoppingListContext)
        {
            Database = shoppingListContext ?? throw new ArgumentNullException(nameof(shoppingListContext));
        }
    }
}
