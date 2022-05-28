using SendGrid;

namespace Shopper.Api.Services
{
    public interface IEmailService
    {
        Task<Response> SendEmailAsync(
            string toAddress,
            string fromAddress,
            string subject,
            string plainTextContent,
            string? htmlContent = null);

        Task<Response> SendPassworResetEmailAsync(string toAddress, string token);
    }
}
