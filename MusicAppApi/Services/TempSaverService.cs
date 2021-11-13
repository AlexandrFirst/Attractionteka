using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Threading.Tasks;
using MusicAppApi.Entities;
using MusicAppApi.Helpers;
using MusicAppApi.IServices;

namespace MusicAppApi.Services
{
    public class TempSaverService : ITempSaverService
    {
        private const int fiveMinsInMsDiv5 = 300000;

        private Scheduler scheduler;
        private ConcurrentDictionary<int, string> userChangePasswordTokenExpirationTimeDictionary;

        public TempSaverService()
        {
            scheduler = new Scheduler();
            userChangePasswordTokenExpirationTimeDictionary = new ConcurrentDictionary<int, string>();
        }

        public async Task<bool> IsUserTokenValid(UserChangePasswordToken userToken)
        {
            Task<bool> newTask = Task<bool>
                .Factory.StartNew(() =>
                {
                    string tokenValue;
                    bool isKeyExists = userChangePasswordTokenExpirationTimeDictionary.TryGetValue(userToken.UserId, out tokenValue);
                    if (!isKeyExists)
                    {
                        return false;
                    }
                    return tokenValue.Equals(userToken.Token);
                });
            return await newTask;
        }

        public async Task<TempSavedEntity<UserChangePasswordToken>> GenerateUserToken(UserChangePasswordToken userToken)
        {

            Task<TempSavedEntity<UserChangePasswordToken>> newTask = Task<TempSavedEntity<UserChangePasswordToken>>
                .Factory.StartNew(() =>
                {
                    return addUserTokenToDicttionary(userToken);
                });
            return await newTask;
        }

        private TempSavedEntity<UserChangePasswordToken> addUserTokenToDicttionary(UserChangePasswordToken userToken)
        {
            DateTime currentTime = DateTime.Now;
            bool isUserNotChangingPassword = userChangePasswordTokenExpirationTimeDictionary.TryAdd(userToken.UserId, userToken.Token);
            if (!isUserNotChangingPassword)
            {
                string value;
                userChangePasswordTokenExpirationTimeDictionary.Remove(userToken.UserId, out value);
            }

            scheduler.Execute(() =>
            {
                string value;
                userChangePasswordTokenExpirationTimeDictionary.Remove(userToken.UserId, out value);
                System.Console.WriteLine("Token is removed");
            }, fiveMinsInMsDiv5);

            return new TempSavedEntity<UserChangePasswordToken>()
            {
                ExpirationTime = currentTime.AddMilliseconds(fiveMinsInMsDiv5),
                Key = userToken.UserId,
                SavedEntity = userToken
            };
        }

        public async Task<bool> RemoveToken(int userId)
        {
            return await Task<bool>.Factory.StartNew(() =>
            {
                string value;
                return userChangePasswordTokenExpirationTimeDictionary.Remove(userId, out value);
            });
        }

        public async Task<int> GetUserIdByToken(string token)
        {
            return await Task<int>.Factory.StartNew(() =>
            {
                foreach (var userIdToken in userChangePasswordTokenExpirationTimeDictionary)
                {
                    if(userIdToken.Value.Equals(token))
                        return userIdToken.Key;
                }
                return -1;
            });
        }
    }
}