using BuddyGoals.Services.IServices;
using Microsoft.Extensions.Caching.Memory;

namespace BuddyGoals.Services
{
    public class MemoryCacheService(IMemoryCache memoryCache):ICacheService
    {
        private readonly IMemoryCache _memoryCache = memoryCache;

        public Task<T?> GetAsync<T>(string key)
        {
            _memoryCache.TryGetValue(key, out T value);
            return Task.FromResult(value);
        }

        public Task SetAsync<T>(string key,T value,TimeSpan? expiry = null)
        {
            _memoryCache.Set(key, value, expiry ?? TimeSpan.FromMinutes(10));
            return Task.CompletedTask;
        }

        public Task RemoveAsync(string key)
        {
            _memoryCache?.Remove(key);
            return Task.CompletedTask;
        }
    }
}
