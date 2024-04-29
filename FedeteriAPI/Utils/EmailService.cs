using System.Net;
using System.Net.Mail;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Utils
{
    public static class EmailService
    {
        public static Task SendEmailAsync(string email, string subject, string message) {
            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(Email.ADDRESS, Email.PASSWORD)
            };

            return client.SendMailAsync(new MailMessage(
                from: Email.ADDRESS,
                to: email,
                subject: subject,
                message
            ));
        }
    }
}
