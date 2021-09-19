using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.Models;

namespace MusicAppApi.IServices
{
    public interface IAuthService
    {
        Task<User> GetName();
    }
}