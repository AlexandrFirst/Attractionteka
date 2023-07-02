using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MusicAppApi.IServices;
using MusicAppApi.Models;

namespace MusicAppApi.Helpers.BackgroundTasks
{
    public class MediaCleaner : IHostedService, IDisposable
    {
        private Timer timer = null;
        private readonly IServiceScopeFactory scopeFactory;
        private IServiceScope scope;
        public MediaCleaner(IServiceScopeFactory scopeFactory)
        {
            this.scopeFactory = scopeFactory;

        }

        public void Dispose()
        {
            timer?.Dispose();
            scope?.Dispose();
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
            scope = scopeFactory.CreateScope();

            MyDataContext context = scope.ServiceProvider.GetRequiredService<MyDataContext>();
            ICloudinaryService cloudinaryService = scope.ServiceProvider.GetRequiredService<ICloudinaryService>(); ;

            timer = new Timer(async o =>
                    {
                        System.Console.WriteLine("Media data cleaned");
                        var photosWithoutPlace = await GetUnusedMediaFromContext(context.PhotoFiles);
                        var vidsWithoutPlace = await GetUnusedMediaFromContext(context.VideoFiles);
                        var musicWithoutPlace = await GetUnusedMediaFromContext(context.AudioFiles);

                        await DeleteUnusedMedia(cloudinaryService, photosWithoutPlace, MediaCategory.PhotoCategory);
                        await DeleteUnusedMedia(cloudinaryService, vidsWithoutPlace, MediaCategory.VideoCategory);
                        await DeleteUnusedMedia(cloudinaryService, musicWithoutPlace, MediaCategory.AudioCategory);

                    }, null, TimeSpan.Zero, TimeSpan.FromDays(1));

            return Task.CompletedTask;
        }

        private async Task<List<MediaFile>> GetUnusedMediaFromContext(IQueryable<MediaFile> mediaContext)
        {

            return await mediaContext.Include(p => p.PlaceDescription)
                                      .Where(p => p.PlaceDescription == null)
                                      .ToListAsync();
        }

        private async Task DeleteUnusedMedia(ICloudinaryService service, List<MediaFile> files, string category)
        {
            foreach (var file in files)
            {
                await service.DeleteFile(file.PublicId, category);
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            return Task.CompletedTask;
        }
    }
}