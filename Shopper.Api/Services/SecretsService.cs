namespace Shopper.Api.Services
{
    public class SecretsService : ISercretsService
    {
        public string JwtSecret { get; }
        public string EmailServiceToken { get; }
        public string FromEmailAddress { get; }

        public SecretsService(IConfiguration configuration)
        {
            JwtSecret = configuration["Secrets:JwtSecret"];
            EmailServiceToken = configuration["Secrets:EmailServiceToken"];
            FromEmailAddress = configuration["Secrets:FromEmailAddress"];
        }
    }
}
