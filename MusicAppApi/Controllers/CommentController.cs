using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.DTOs;
using MusicAppApi.IServices;
using MusicAppApi.Models;
using MusicAppApi.Services;

namespace MusicAppApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly MyDataContext dataContext;
        private readonly IUserContextService userContext;
        private readonly IMapper mapper;

        public CommentController(MyDataContext dataContext,
                                IUserContextService userContext,
                                IMapper mapper)
        {
            this.dataContext = dataContext;
            this.userContext = userContext;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> SendComment([FromBody] CreateCommentDto commentData)
        {
            var contextUser = userContext.GetUserContext();

            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == contextUser.Id);
            if (user == null)
                throw new System.Exception("Who are you?");

            var place = await dataContext.PlaceDescriptions.FirstOrDefaultAsync(u => u.Id == commentData.PlaceId);
            if (place == null)
                throw new System.Exception("No place found");

            var comment = new Comment()
            {
                Author = user,
                Content = commentData.Content,
                Place = place,
                CommentTime = DateTime.Now
            };

            await dataContext.Comments.AddAsync(comment);
            await dataContext.SaveChangesAsync();

            return Ok(comment);
        }

        [HttpDelete("{commentId}")]
        public async Task<IActionResult> DeleteComment(int commentId)
        {
            var contextUser = userContext.GetUserContext();
            var comment = await dataContext.Comments.Include(c => c.Author).Include(r => r.CommentReplies).FirstOrDefaultAsync(c => c.Id == commentId);
            if (comment == null)
                throw new System.Exception("No comment found");

            if (comment.Author.Id != contextUser.Id && contextUser.Role == UserRoles.User)
                throw new System.Exception("You have no rights do delete comment");

            if (comment.CommentReplies.Count == 0)
                comment.Content = "";
            else
                dataContext.Comments.Remove(comment);
            await dataContext.SaveChangesAsync();

            return Ok(new
            {
                Response = "Comment is deleted"
            });
        }

        [HttpGet("place/{placeId}")]
        public async Task<IActionResult> GetPlaceComments(int placeId)
        {
            var place = await dataContext.PlaceDescriptions.Include(c => c.Comments).FirstOrDefaultAsync(u => u.Id == placeId);
            if (place == null)
                throw new System.Exception("No place found");

            var comments = mapper.Map<List<CommentDto>>(place.Comments);
            return Ok(comments);
        }


        [HttpGet("single/{commentId}")]
        public async Task<IActionResult> GetSingleComments(int commentId)
        {
            var comment = await dataContext.Comments.Include(r => r.CommentReplies).FirstOrDefaultAsync(u => u.Id == commentId);
            if (comment == null)
                throw new System.Exception("No comment found");

            var commentDto = mapper.Map<CommentDto>(comment);
            return Ok(commentDto);
        }

        [HttpPut("{commentId}")]
        public async Task<IActionResult> UpdateComment(int commentId, [FromBody] UpdateCommentDto commentData)
        {
            var comment = await dataContext.Comments.Include(r => r.CommentReplies).Include(a => a.Author).FirstOrDefaultAsync(u => u.Id == commentId);
            var contextUser = userContext.GetUserContext();

            if (comment == null)
                throw new System.Exception("No comment found");

            if (comment.Author.Id != contextUser.Id)
                throw new System.Exception("You have no rights do update comment");

            comment.Content = commentData.Content;
            await dataContext.SaveChangesAsync();

            var updatedComment = mapper.Map<CommentDto>(comment);

            return Ok(updatedComment);
        }
    }
}