using BuddyGoals.Services.IServices;
using Microsoft.Extensions.Caching.Distributed;
using System.Text.Json;

namespace BuddyGoals.Services
{
    public class RedisCacheService(IDistributedCache cache):ICacheService
    {
        private readonly IDistributedCache _cache = cache;
        public async Task<T?> GetAsync<T>(string key)
        {
            var data = await _cache.GetStringAsync(key);
            return data is null ? default : JsonSerializer.Deserialize<T>(data);
        }

        public async Task SetAsync<T>(string key, T value, TimeSpan? expiry = null)
        {
            var options = new DistributedCacheEntryOptions
            {
                AbsoluteExpirationRelativeToNow = expiry ?? TimeSpan.FromMinutes(10)
            };
            var json = JsonSerializer.Serialize(value);
            await _cache.SetStringAsync(key, json, options);
        }

        public Task RemoveAsync(string key) => _cache.RemoveAsync(key);
    }
}
