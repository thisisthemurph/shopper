using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;
using Shopper.Api.Services;
using System.Security.Claims;

namespace Shopper.Api.ActionFilters
{
    public class ApplicationUserFilter : IAsyncActionFilter
    {
        private readonly IContextService _context;
        public ApplicationUserFilter(IContextService contextService)
        {
            _context = contextService;
        }

        public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
        {
            var emailClaim = context.HttpContext.User.Claims
                .FirstOrDefault(x => x.Type == ClaimTypes.Email);

            if (emailClaim == null)
            {
                context.Result = new BadRequestObjectResult("Cannot find user");
                return;
            }

            var user = await _context.Database.ApplicationUsers
                .FirstOrDefaultAsync(x => x.Email == emailClaim.Value);

            if (user == null)
            {
                context.Result = new BadRequestObjectResult("Cannot find user with given email address");
                return;
            }

            context.HttpContext.Items.Add("ApplicationUser", user);
            await next();
        }
    }
}
