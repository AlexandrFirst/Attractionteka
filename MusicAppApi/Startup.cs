using System.Linq;
using System.Text.Json.Serialization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.OpenApi.Models;
using MusicAppApi.Entities;
using MusicAppApi.Helpers;
using MusicAppApi.Helpers.Email;
using MusicAppApi.Helpers.ExceptionHandler;
using MusicAppApi.Helpers.Extensions.RatingExtension;
using MusicAppApi.IServices;
using MusicAppApi.Models;
using MusicAppApi.Services;
using Newtonsoft.Json;

namespace MusicAppApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;

            var optionsBuilder = new DbContextOptionsBuilder<MyDataContext>();
            optionsBuilder.UseSqlServer(Configuration.GetConnectionString("MusicAppDB"));

            using (MyDataContext dbContext
                        = new MyDataContext(optionsBuilder.Options))
            {
                var adminUser = dbContext.Users.FirstOrDefault(u => u.Role.Equals(UserRoles.Admin));
                if (adminUser == null)
                {
                    var newUser = new User()
                    {
                        Mail = "root@gmail.com",
                        IsBanned = false,
                        Name = "admin",
                        Password = "1q2w3e",
                        Role = UserRoles.Admin,
                        Surname = "admin"
                    };

                    dbContext.Users.Add(newUser);
                    dbContext.SaveChanges();
                }
            }
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
           {
               options.AddPolicy("AnyHeadersAllowed", builder =>
               {
                   builder.AllowAnyOrigin()
                           .AllowAnyHeader()
                           .AllowAnyMethod();
               });
           });


            services.AddControllers();
            services.AddControllers().AddNewtonsoftJson(o =>
            {
                o.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
            });
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<ICloudinaryService, CloudinaryService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IPlaceService, PlaceService>();
            services.AddScoped<IUserContextService, UserContextService>();

            services.TryAddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.TryAddSingleton<ITempSaverService, TempSaverService>();
            services.TryAddSingleton<IMailService, MailService>();

            services.AddDbContext<MyDataContext>(options => options.UseSqlServer(Configuration.GetConnectionString("MusicAppDB")));

            services.Configure<AppSettings>(Configuration.GetSection("AppSettings"));
            services.Configure<CloudinarySettings>(Configuration.GetSection("CloudinarySettings"));
            services.Configure<EmailCreds>(Configuration.GetSection("EmailCredentials"));

            services.AddAutoMapper(typeof(Startup));

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "MusicAppApi", Version = "v1" });
            });

            var serviceProvider = services.BuildServiceProvider();
            RatingExtension.Configure(serviceProvider.GetService<MyDataContext>());
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
                app.UseSwagger();
                app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "MusicAppApi v1"));
            }

            app.UseRouting();

            app.ConfigureExceptionHandler();
            app.UseCors("AnyHeadersAllowed");


            app.UseRouting();

            app.UseMiddleware<JwtMiddleware>();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
