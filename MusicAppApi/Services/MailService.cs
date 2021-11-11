using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Options;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers.Email;
using MusicAppApi.IServices;

namespace MusicAppApi.Services
{
    public class MailService : IMailService
    {
        private readonly EmailCreds emailCreds;
     
        SmtpClient smtp = new SmtpClient();

        public MailService(IOptions<EmailCreds> emailCreds)
        {
            this.emailCreds = emailCreds.Value;

            smtp.Port = 587;
            smtp.EnableSsl = true;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new NetworkCredential(this.emailCreds.FromMailAddress, this.emailCreds.Password);
            smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
        }

        public async Task<MailDto> SendMail(MailDto mailDto)
        {
            MailMessage message = new MailMessage();

            message.From = new MailAddress(emailCreds.FromMailAddress);
            message.To.Add(new MailAddress(mailDto.Mail));
            message.Subject ="Password change token";
            message.IsBodyHtml = true;
            message.Body = mailDto.Content;
            
            await smtp.SendMailAsync(message);
            
            return mailDto;
        }
    }
}