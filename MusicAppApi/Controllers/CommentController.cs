using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MusicAppApi.DTOs;
using MusicAppApi.Helpers;
using MusicAppApi.IServices;
using MusicAppApi.Models;
using MusicAppApi.Services;

namespace MusicAppApi.Controllers
{
    [Authorize]
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

                Content = commentData.Content,

                CommentTime = DateTime.Now
            };

            await AddHistotyRecord(user, place);

            await dataContext.Comments.AddAsync(comment);
            await dataContext.SaveChangesAsync();

            comment.Author = user;
            comment.Place = place;

            await dataContext.SaveChangesAsync();

            return Ok(mapper.Map<CommentDto>(comment));
        }



        [HttpPost("reply/{commentId}")]
        public async Task<IActionResult> ReplyComment(int commentId, [FromBody] CreateCommentDto commentData)
        {
            var contextUser = userContext.GetUserContext();

            var user = await dataContext.Users.FirstOrDefaultAsync(u => u.Id == contextUser.Id);
            if (user == null)
                throw new System.Exception("Who are you?");

            var parentComment = await dataContext.Comments.Include(p => p.Place).FirstOrDefaultAsync(u => u.Id == commentId);
            if (parentComment == null)
                throw new System.Exception("Comment found");

            var place = await dataContext.PlaceDescriptions.FirstOrDefaultAsync(u => u.Id == commentData.PlaceId);
            if (place == null)
                throw new System.Exception("No place found");

            if (place.Id != parentComment.Place.Id)
                throw new System.Exception("Something wrong happened! Try again");

            var replyComment = new Comment()
            {
                Content = commentData.Content,

                CommentTime = DateTime.Now
            };

            // await dataContext.Comments.AddAsync(replyComment);
            await AddHistotyRecord(user, place);

            replyComment.Place = place;
            replyComment.Author = user;

            parentComment.CommentReplies.Add(replyComment);

            await dataContext.SaveChangesAsync();

            return Ok(replyComment);
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


        [HttpGet("place/{placeId}")]
        public async Task<IActionResult> GetPlaceComments(int placeId)
        {
            var place = await dataContext.PlaceDescriptions
                .Include(c => c.Comments)
                .ThenInclude(c => c.CommentReplies)
                .Include(c => c.Comments)
                .ThenInclude(a => a.Author)
                .FirstOrDefaultAsync(u => u.Id == placeId);


            if (place == null)
                throw new System.Exception("No place found");

            foreach (var comment in place.Comments)
            {
                comment.CommentReplies = await GetReplies(comment.CommentReplies);
            }

            var comments = mapper.Map<List<CommentDto>>(place.Comments);
            var finalComments = new List<CommentDto>();
            comments.ForEach(c =>
            {
                if (c.ParentComment == null)
                {
                    finalComments.Add(c);
                }
            });

            return Ok(finalComments);
        }


        [HttpGet("single/{commentId}")]
        public async Task<IActionResult> GetSingleComments(int commentId)
        {
            var comment = await dataContext.Comments.Include(r => r.CommentReplies).FirstOrDefaultAsync(u => u.Id == commentId);
            if (comment == null)
                throw new System.Exception("No comment found");

            comment.CommentReplies = await GetReplies(comment.CommentReplies);

            var commentDto = mapper.Map<CommentDto>(comment);
            return Ok(commentDto);
        }

        private async Task<List<Comment>> GetReplies(List<Comment> replies)
        {
            if (replies.Count == 0)
            {
                return new List<Comment>();
            }

            foreach (var comment in replies)
            {
                var commentWithReplies = await dataContext.Comments.Include(c => c.CommentReplies).Include(a => a.Author)
                                                        .FirstOrDefaultAsync(p => p.Id == comment.Id);

                comment.CommentReplies = await GetReplies(commentWithReplies.CommentReplies);
            }

            return replies;

        }

        private async Task AddHistotyRecord(User user, PlaceDescription place)
        {
            var currentPlaceUserVisitHistory = (await dataContext.UsersHistory
                .Include(u => u.User)
                .Include(p => p.VisitedPlace).ToListAsync())
                .Where(h =>
                    (DateTime.Now - h.VisitTime).Minutes > 10 &&
                    h.User.Id == user.Id &&
                    h.VisitedPlace.Id == place.Id).ToList();

            if (currentPlaceUserVisitHistory.Count == 0)
            {
                var visitPlaceRecord = new UserVisitHistory()
                {
                    User = user,
                    VisitedPlace = place,
                    VisitTime = DateTime.Now
                };
                await dataContext.UsersHistory.AddAsync(visitPlaceRecord);
            }

            await dataContext.SaveChangesAsync();
        }
    }
}