namespace Shopper.Api.Models
{
    public enum ShoppingListItemStatus
    {
        /// <summary>
        /// An item that is in the shopping list but has been checked as bought
        /// </summary>
        Checked,

        /// <summary>
        /// An item that is in the shopping list and has not been bought
        /// </summary>
        Unchecked
    }
}
