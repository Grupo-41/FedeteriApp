using System.IO;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Text;
using static FedeteriAPI.Utils.Constants;

namespace FedeteriAPI.Utils
{
    public static class EmailService
    {
        public static Task SendEmailAsync(string email, string subject, string message) {
            var client = new SmtpClient("smtp-mail.outlook.com", 587)
            {
                EnableSsl = true,
                Credentials = new NetworkCredential(Email.ADDRESS, Email.PASSWORD),
            };

            MailMessage msg = new MailMessage();
            msg.To.Add(email);
            msg.From = new MailAddress(Email.ADDRESS);
            msg.Subject = subject;
            msg.AlternateViews.Add(GenerateMessageBody(message));
            msg.IsBodyHtml = true;
            msg.Priority = MailPriority.High;
            msg.BodyEncoding = Encoding.Default;

            return client.SendMailAsync(msg);
        }

        private static AlternateView GenerateMessageBody(string message)
        {
            LinkedResource Img = new LinkedResource(@"Images/FedeteriaLogo.png", MediaTypeNames.Image.Png);
            Console.WriteLine(Img.ToString());
            Img.ContentId = "MyLogo";

            string str = @"
            <table>
                <tr>
                    <td>
                        <img src=cid:MyLogo id='img' alt='' width='375px' height='55px' />
                    </td>
                </tr>
                <br />
                <tr>
                    <td>" + message + @"
                    </td>
                </tr>
            </table>
            ";

            AlternateView av = AlternateView.CreateAlternateViewFromString(str, null, MediaTypeNames.Text.Html);
            av.LinkedResources.Add(Img);
            return av;
        }
    }
}
