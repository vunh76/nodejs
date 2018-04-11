const cacheManager = require('cache-manager');
const redisStore = require('cache-manager-redis');

var cached = null;

module.exports = (promiseDependency, useRedis) => {
    var options = {
        store: 'memory',
        isCacheableValue: (data) => (
            data !== null && data !== undefined
        ),
        max: 100000,
        ttl: 1440,
        promiseDependency: promiseDependency
    };

    const redisStoreOption = {
        store: redisStore,
        host: '127.0.0.1',
        port: 6379
    };

    options = Object.assign(options, redisStoreOption);
    
    return cached ? cached : (cached = cacheManager.caching(options));
};
