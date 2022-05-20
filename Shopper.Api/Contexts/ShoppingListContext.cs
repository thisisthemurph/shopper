using Microsoft.EntityFrameworkCore;
using Shopper.Api.Auth;
using Shopper.Api.Controllers.Models;
using Shopper.Api.Models;

namespace Shopper.Api.Contexts
{
    public class ShoppingListContext : DbContext
    {
        public DbSet<ShoppingList> ShoppingLists { get; set; }
        public DbSet<ShoppingListItem> ShoppingListItems { get; set; }
        public DbSet<ShoppingListItemCategory> ShoppingListItemCategories { get; set; }
        public DbSet<ApplicationUser> ApplicationUsers { get; set; }

        public string DbPath { get; }

        public ShoppingListContext(DbContextOptions<ShoppingListContext> options) : base(options) 
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = Path.Join(path, "ShoppingList.sqlite");
        }

        public ShoppingListContext()
        {
            var folder = Environment.SpecialFolder.LocalApplicationData;
            var path = Environment.GetFolderPath(folder);
            DbPath = Path.Join(path, "ShoppingList.sqlite");
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlite($"Data Source={DbPath}");
        }
        //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) => optionsBuilder.UseNpgsql("Host=my_host;Database=my_db;Username=my_user;password=my_pw");
    }
}
