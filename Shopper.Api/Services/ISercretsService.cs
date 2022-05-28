namespace Shopper.Api.Services
{
    public interface ISercretsService
    {
        string JwtSecret { get; }
        string EmailServiceToken { get; }
        string FromEmailAddress { get; }
    }
}
