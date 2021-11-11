using System;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.DTOs;
using MusicAppApi.Entities;
using MusicAppApi.Helpers;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Services
{
    public class UserService : IUserService
    {
        private readonly MyDataContext context;
        private readonly IMailService mailService;
        private readonly ITempSaverService tempSaverService;
        private readonly IMapper mapper;

        public UserService(MyDataContext context,
                           IMailService mailService,
                           ITempSaverService tempSaverService,
                           IMapper mapper)
        {
            this.tempSaverService = tempSaverService;
            this.mapper = mapper;
            this.mailService = mailService;
            this.context = context;
        }



        public async Task<User> GetUserById(int userId)
        {
            return await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
        }

        public async Task<UserDto> UpdatePassword(int userId, UpdatePasswordDto updatePasswordDto, string token)
        {
            var user = await GetUserById(userId);
            
            bool isUserTokenValid = await IsTokenValid(userId, token);

            if(!isUserTokenValid){
                throw new Exception("Can't validate token");
            }

            if(updatePasswordDto.OldPassword == user.Password){
                user.Password = updatePasswordDto.NewPassword;
            }

            context.Update(user);
            await context.SaveChangesAsync();

            return mapper.Map<UserDto>(user);
        }

        public async Task<bool> IsTokenValid(int userId, string token)
        {
            return await tempSaverService.IsUserTokenValid(new UserChangePasswordToken()
            {
                Token = token,
                UserId = userId
            });
        }

        public async Task GenerateToken(int userId)
        {
            var user = await GetUserById(userId);

            Guid g = Guid.NewGuid();
            string guid = Guid.NewGuid().ToString();

            var userPasswordToken = new UserChangePasswordToken()
            {
                UserId = userId,
                Token = guid
            };

            var tokenTempSaverReponse = (await tempSaverService.GenerateUserToken(userPasswordToken)) as TempSavedEntity<UserChangePasswordToken>;

            var tokenGenerationResponse = new TokenGenerationResponse()
            {
                ExpirationDate = tokenTempSaverReponse.ExpirationTime,
                Token = tokenTempSaverReponse.SavedEntity.Token
            };

            await mailService.SendMail(new MailDto(){
                Content = $"Token for updating password: {tokenGenerationResponse.Token}\n. You have time till {tokenGenerationResponse.ExpirationDate}",
                Mail = user.Mail
            });

        }

        public async Task<UserDto> UpdateUserInfo(UpdateUserInfo userInfo, int userId)
        {
            var user = await GetUserById(userId);
            mapper.Map(userInfo, user);

            context.Update(user);
            await context.SaveChangesAsync();

            return mapper.Map<UserDto>(user);
        }
    }
}