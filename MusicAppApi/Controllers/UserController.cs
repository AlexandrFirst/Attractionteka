using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers;
using MusicAppApi.IServices;
using MusicAppApi.Models;
using MusicAppApi.Services;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService userService;
        private readonly MyDataContext context;

        public UserController(IUserService userService,
                                MyDataContext context)
        {
            this.userService = userService;
            this.context = context;
        }

        [Authorize(Role = "User")]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await userService.GetUserById(userId);
            if (user == null)
                throw new Exception("User not found");

            return Ok(user);
        }

        [HttpPost("user/update/{userId}")]
        public async Task<IActionResult> UpdateUserProfile(int userId, UserDto userDto)
        {
            var user = await userService.GetUserById(userId);
            if (user == null)
                throw new Exception("User not found");

            user.Mail = userDto.Mail;
            user.Name = userDto.Name;
            user.Surname = userDto.Surname;

            context.Users.Update(user);

            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize(Role = UserRoles.Admin)]
        [HttpDelete("user/delete/{userId}")]
        public async Task<IActionResult> DeleteUserProfile(int userId)
        {
            var user = await userService.GetUserById(userId);
            if (user == null)
                throw new Exception("User not found");



            context.Users.Remove(user);

            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize(Role = UserRoles.Admin)]
        [HttpPost("user/delete/{userId}/{newUserRole}")]
        public async Task<IActionResult> ChangeUserRole(int userId, string userRole)
        {

            Type userRoleType = typeof(UserRoles);

            List<FieldInfo> fields = userRoleType.GetFields(BindingFlags.Static | BindingFlags.Public).ToList();


            if (!fields.Any(f => f.Name == userRole))
            {
                throw new Exception("can't find valid user role");
            }


            var user = await userService.GetUserById(userId);
            if (user == null)
                throw new Exception("User not found");

            user.Role = userRole;
            context.Users.Update(user);

            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize(Role = UserRoles.Admin)]
        [HttpPost("user/ban/{userId}")]
        public async Task<IActionResult> BanUser(int userId)
        {
            var user = await userService.GetUserById(userId);
            user.IsBanned = true;
            
            context.Update(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize(Role = UserRoles.Admin)]
        [HttpPost("user/unban/{userId}")]
        public async Task<IActionResult> UnbanUser(int userId)
        {
            var user = await userService.GetUserById(userId);
            user.IsBanned = false;
            
            context.Update(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }


    }
}