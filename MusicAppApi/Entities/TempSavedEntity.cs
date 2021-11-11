using System;

namespace MusicAppApi.Entities
{
    public class TempSavedEntity<Entity>
    {
        public int Key { get; set; }
        public Entity SavedEntity { get; set; }
        public DateTime ExpirationTime { get; set; }
    }
}