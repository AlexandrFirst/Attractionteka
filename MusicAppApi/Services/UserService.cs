using System;
using System.Collections.Generic;
using System.Linq;
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
            var user = await context.Users.FirstOrDefaultAsync(u => u.Id == userId);
            if(user == null)
                throw new Exception("User not found");

            return user;
        }

        public async Task<UserDto> UpdatePassword(int userId, UpdatePasswordDto updatePasswordDto, string token)
        {
            var user = await GetUserById(userId);

            bool isUserTokenValid = await IsTokenValid(userId, token);

            if (!isUserTokenValid)
            {
                throw new Exception("Can't validate token");
            }

            if (updatePasswordDto.OldPassword == user.Password)
            {
                user.Password = updatePasswordDto.NewPassword;
            }

            context.Update(user);
            await context.SaveChangesAsync();

            await tempSaverService.RemoveToken(userId);

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

            await mailService.SendMail(new MailDto()
            {
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

        public async Task<User> GetUserByMail(string mail)
        {
            var user = await context.Users.FirstOrDefaultAsync(u => u.Mail.Equals(mail));
            return user;
        }

        public async Task<UserDto> RestorePassword(RestorePasswordDto restorePasswordDto, string token)
        {
            var userId = await tempSaverService.GetUserIdByToken(token);
            var user = await GetUserById(userId);

            user.Password = restorePasswordDto.NewPassword;
            await context.SaveChangesAsync();

            await tempSaverService.RemoveToken(userId);

            return mapper.Map<UserDto>(user);

        }

        public async Task<List<UserVisistHistoryDto>> GetUserHistory(int userId)
        {
            List<UserVisitHistory> history = await context.UsersHistory
                .Include(u => u.User)
                .Include(p => p.VisitedPlace)
                .ThenInclude(r => r.Ratings)
                .Where(u => u.User.Id == userId)
                .OrderByDescending(t => t.VisitTime)
                .ToListAsync();

            return mapper.Map<List<UserVisistHistoryDto>>(history);
        }
    }
}