using System.Threading.Tasks;
using MusicAppApi.DTOs;

namespace MusicAppApi.IServices
{
    public interface IMailService
    {
         Task<MailDto> SendMail(MailDto mailDto);
    }
}