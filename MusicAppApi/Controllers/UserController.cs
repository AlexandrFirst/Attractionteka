using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
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
        private readonly IUserContextService userContext;

        public UserController(IUserService userService,
                                MyDataContext context,
                                IUserContextService userContext)
        {
            this.userContext = userContext;
            this.userService = userService;
            this.context = context;
        }

        [Authorize(Role = UserRoles.User)]
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserById(int userId)
        {
            var user = await userService.GetUserById(userId);
            if (user == null)
                throw new Exception("User not found");

            return Ok(user);
        }

        [HttpPost("user/update/{userId}")]
        public async Task<IActionResult> UpdateUserProfile(int userId, UpdateUserInfo userDto)
        {
            var updatedUser = await userService.UpdateUserInfo(userDto, userId);
            return Ok(updatedUser);
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
        [HttpDelete("user/ban/{userId}")]
        public async Task<IActionResult> BanUser(int userId)
        {
            var user = await userService.GetUserById(userId);
            user.IsBanned = true;

            context.Update(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize(Role = UserRoles.Admin)]
        [HttpDelete("user/unban/{userId}")]
        public async Task<IActionResult> UnbanUser(int userId)
        {
            var user = await userService.GetUserById(userId);
            user.IsBanned = false;

            context.Update(user);
            await context.SaveChangesAsync();
            return Ok(user);
        }

        [Authorize]
        [HttpGet("token/get")]
        public async Task<IActionResult> ReceiveTokenToUpdatePassword()
        {
            var userId = userContext.GetUserContext().Id;

            await userService.GenerateToken(userId);
            return Ok(new { Message = "Token is generated. Chack mail" });
        }

        [HttpGet("token/get/{mail}")]
        public async Task<IActionResult> ReceiveTokenToRestorePassword(string mail)
        {
            var user = await userService.GetUserByMail(mail);
            var userId = user.Id;

            await userService.GenerateToken(userId);
            return Ok(new { Message = "Token is generated. Chack mail" });
        }


        [HttpGet("token/validate/{userId}/{token}")]
        public async Task<IActionResult> ValidateTokenToUpdatePassword(int userId, string token)
        {
            var success = await userService.IsTokenValid(userId, token);
            if (success)
            {
                return Ok(new { Message = "Token is valid" });
            }
            else
            {
                return BadRequest(new { Message = "Generate token again" });
            }
        }

        [Authorize]
        [HttpPut("password/update/{token}")]
        public async Task<IActionResult> UpdatePassword(string token, UpdatePasswordDto passwords)
        {
            var userId = userContext.GetUserContext().Id;

            var userDto = await userService.UpdatePassword(userId, passwords, token);
            return Ok(userDto);
        }


        [HttpPut("password/restore/{token}")]
        public async Task<IActionResult> RestorePassword(string token, RestorePasswordDto passwords)
        {
            var userDto = await userService.RestorePassword(passwords, token);
            return Ok(userDto);
        }

        [Authorize]
        [HttpGet("place/{placeId}/mark")]
        public async Task<IActionResult> GetPlaceMark(int placeId)
        {
            var userId = userContext.GetUserContext().Id;
            var rating = await context.Ratings.Include(u => u.User)
                                                .Include(p => p.Place)
                                                .FirstOrDefaultAsync(r => r.User.Id == userId && r.Place.Id == placeId);
            if (rating == null)
            {
                return Ok(new { mark = 0 });
            }
            else
            {
                return Ok(new { mark = rating.Rating });
            }
        }

        [Authorize]
        [HttpGet("history")]
        public async Task<IActionResult> GetUserHistory()
        {
            var userId = userContext.GetUserContext().Id;
            
            var history = await userService.GetUserHistory(userId);
            return Ok(history);
        }
    }
}