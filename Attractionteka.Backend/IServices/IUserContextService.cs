using MusicAppApi.Entities;

namespace MusicAppApi.IServices
{
    public interface IUserContextService
    {
        HttpUserContext GetUserContext();
    }
}