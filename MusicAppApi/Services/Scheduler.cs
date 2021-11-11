using System;
using System.Collections.Concurrent;

namespace MusicAppApi.Services
{
    public class Scheduler
    {
        private readonly ConcurrentDictionary<Action, ScheduledTask> scheduledTasks = new ConcurrentDictionary<Action, ScheduledTask>();

        public void Execute(Action action, int timeoutMs)
        {
            var task = new ScheduledTask(action, timeoutMs);
            task.TaskComplete += RemoveTask;
            scheduledTasks.TryAdd(action, task);
            task.Timer.Start();
        }

        private void RemoveTask(object sender, EventArgs e)
        {
            var task = (ScheduledTask)sender;
            task.TaskComplete -= RemoveTask;
            ScheduledTask deleted;
            scheduledTasks.TryRemove(task.Action, out deleted);
        }
    }
}