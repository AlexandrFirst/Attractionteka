using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MusicAppApi.DTOs;
using MusicAppApi.Entities;
using MusicAppApi.Helpers.ExceptionHandler.CustomExceptions;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public static class UserRoles
    {
        public const string User = "User";
        public const string Admin = "Admin";
    }


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
            newUser.Role = UserRoles.User;

            try
            {
                await myDataContext.Users.AddAsync(newUser);
                await myDataContext.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw new InsertUserException();
            }

            return newUser;
        }

        public async Task<UserLoginOutputDto> NativeLogin(UserLoginInputDto model)
        {
            var user = await myDataContext.Users
                                      .FirstOrDefaultAsync(u => u.Password == model.UserPassword &&
                                                                    u.Mail == model.UserMail);

            if (user == null)
                throw new Exception("No user found");
            if(user.IsBanned)
                throw new Exception("This user is banned");


            var token = generateJwtToken(user);


            return new UserLoginOutputDto()
            {
                UserId = user.Id,
                UserToken = token,
                Name = user.Name,
                Surname = user.Surname
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
                     new Claim(ClaimTypes.Role, user.Role)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}