using SendGrid;
using SendGrid.Helpers.Mail;

namespace Shopper.Api.Services
{
    public class EmailService : IEmailService
    {
        private readonly string _apiKey;
        private readonly string _fromAddress;

        public EmailService(ISercretsService secrets)
        {
            _apiKey = secrets.EmailServiceToken;
            _fromAddress = secrets.FromEmailAddress;
        }

        public async Task<Response> SendEmailAsync(
            string toAddress,
            string fromAddress,
            string subject,
            string plainTextContent,
            string? htmlContent = null)
        {
            var client = new SendGridClient(_apiKey);
            var from = new EmailAddress(fromAddress, "Shopper Auth");
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

        public async Task<Response> SendPassworResetEmailAsync(string toAddress, string passwordResetToken)
        {
            var resetLink = $"http://localhost:4200/auth/passwordReset/?token={passwordResetToken}";

            var subject = "Shopper - Password reset requested";
            var mainPart = "If you recently requested a password reset, use the following link:";
            var plainTextContent = $"{mainPart} {resetLink}";
            var htmlContent = $"<p>{mainPart}</p><p><a href='{resetLink}'>Reset your password</a></p>";

            return await this.SendEmailAsync(
                toAddress,
                _fromAddress,
                subject,
                plainTextContent,
                htmlContent);
        }
    }
}
