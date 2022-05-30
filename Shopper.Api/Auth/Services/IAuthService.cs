namespace Shopper.Api.Auth.Services
{
    public interface IAuthService
    {
        ApplicationUser getApplicationUser(string bearerToken);
    }
}
