using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MusicAppApi.DTOs;
using MusicAppApi.HelperDtos;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public class AuthService : IAuthService
    {
        private readonly MyDataContext myDataContext;
        private readonly IMapper mapper;
        private readonly AppSettings appSettings;

        public AuthService(MyDataContext myDataContext,
                            IMapper mapper,
                            IOptions<AppSettings> appSettings)
        {
            this.myDataContext = myDataContext;
            this.mapper = mapper;
            this.appSettings = appSettings.Value;
        }

        public HttpUserContext GetUserContext(int userId)
        {
            var user = myDataContext.Users
                                  .FirstOrDefault(u => u.Id == userId);

            if (user == null)
                return null;

            return new HttpUserContext()
            {
                Id = user.Id,
                Mail = user.Mail,
                Role = user.Role
            };
        }



        public async Task<User> NativeRegister(NativeUserRegisterDto userData)
        {
            var newUser = mapper.Map<User>(userData);

            await myDataContext.Users.AddAsync(newUser);
            await myDataContext.SaveChangesAsync();
            return newUser;
        }

        public async Task<UserLoginOutputDto> NativeLogin(UserLoginInputDto model)
        {
            var user = await myDataContext.Users
                                      .FirstOrDefaultAsync(u => u.Password == model.UserPassword &&
                                                                    u.Mail == model.UserMail);

            if (user == null)
                return null;

            var token = generateJwtToken(user);

            return new UserLoginOutputDto()
            {
                UserId = user.Id,
                UserToken = token
            };
        }

        private string generateJwtToken(User user)
        {
            // generate token that is valid for 7 days
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                     new Claim("id", user.Id.ToString()),
                     new Claim(ClaimTypes.Role, "User")
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}