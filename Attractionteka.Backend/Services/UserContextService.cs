using Microsoft.AspNetCore.Http;
using MusicAppApi.Entities;
using MusicAppApi.IServices;

namespace MusicAppApi.Services
{
    public class UserContextService : IUserContextService
    {
        private readonly IHttpContextAccessor contextAccessor;
        private HttpUserContext _userContext;

        public UserContextService(IHttpContextAccessor accessor)
        {
            contextAccessor = accessor;
        }

        private HttpContext Context
        {
            get
            {
                return contextAccessor.HttpContext;
            }
        }

        public HttpUserContext GetUserContext()
        {
           return (HttpUserContext)Context.Items["User"];
        }
    }
}