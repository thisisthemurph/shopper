using Microsoft.AspNetCore.Mvc;
using Shopper.Api.Auth;

namespace Shopper.Api.Extensions
{
    public static class ControllerBaseExtensions
    {
        public static ApplicationUser? GetApplicationUser(this ControllerBase controller)
        {
            return controller.HttpContext.Items["ApplicationUser"] as ApplicationUser;
        }
    }
}
