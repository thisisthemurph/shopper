using Shopper.Api.Contexts;

namespace Shopper.Api.Services
{
    public interface IContextService
    {
        ShoppingListContext Database { get; }
    }
}
