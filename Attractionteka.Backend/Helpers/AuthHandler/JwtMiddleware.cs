using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MusicAppApi.Entities;
using MusicAppApi.IServices;

namespace MusicAppApi.Helpers
{
   public class JwtMiddleware
    {
        private readonly RequestDelegate next;
        private readonly AppSettings appSettings;

        public JwtMiddleware(RequestDelegate next, IOptions<AppSettings> appSettings)
        {
            this.next = next;
            this.appSettings = appSettings.Value;
        }

        public async Task Invoke(HttpContext context, IAuthService authService)
        {
            var token = context.Request.Headers["Authorization"].FirstOrDefault();

            if (token != null)
            {
                var token_str = token.Split(" ").Last();


                attachUserToContext(context, authService, token_str);
            }
            else
            {
                var request = context.Request;
                if (request.Path.StartsWithSegments("/chat", StringComparison.OrdinalIgnoreCase) &&
                request.Query.TryGetValue("access_token", out var accessToken))
                {
                    attachUserToContext(context, authService, accessToken);
                }
            }

            await next(context);
        }

        private void attachUserToContext(HttpContext context, IAuthService authService, string token)
        {
            try
            {
                var tokenHandler = new JwtSecurityTokenHandler();
                var key = Encoding.ASCII.GetBytes(appSettings.Secret);

                tokenHandler.ValidateToken(token, new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    // set clockskew to zero so tokens expire exactly at token expiration time (instead of 5 minutes later)
                    ClockSkew = TimeSpan.Zero
                }, out SecurityToken validatedToken);

                var jwtToken = (JwtSecurityToken)validatedToken;
                var userId = int.Parse(jwtToken.Claims.First(x => x.Type == "id").Value);

                // attach user to context on successful jwt validation
                context.Items["User"] = authService.GetUserContext(userId);
            }
            catch
            {
                // do nothing if jwt validation fails
                // user is not attached to context so request won't have access to secure routes
            }
        }
    }
}