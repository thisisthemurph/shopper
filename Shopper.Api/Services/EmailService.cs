using SendGrid;
using SendGrid.Helpers.Mail;

namespace Shopper.Api.Services
{
    public class EmailService
    {
        private readonly string _apiKey;
        private readonly string _fromAddress;

        public EmailService(string apiKey)
        {
            _apiKey = apiKey;
            _fromAddress = "mikhl90+shopper@gmail.com";
        }

        public async Task<Response> SendPassworResetEmailAsync(string toAddress, string token)
        {
            var resetLink = $"http://localhost:4200/auth/passwordReset/?token={token}";

            var subject = "Shopper - Password reset requested";
            var mainPart = "If you recently requested a password reset, use the following link:";
            var plainTextContent = $"{mainPart} {resetLink}";
            var htmlContent = $"<p>{mainPart}</p><p><a href='{resetLink}'>Reset your password</a></p>";

            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress(_fromAddress, "Shopper Auth");
            var to = new EmailAddress(toAddress);

            var msg = MailHelper.CreateSingleEmail(
                from, 
                to, 
                subject, 
                plainTextContent, 
                htmlContent);

            var response = await client.SendEmailAsync(msg);
            return response;
        }
    }
}
