export default () => ({
    weatherApiKey: process.env.WEATHER_API_KEY,
    redis: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        ttl: parseInt(process.env.REDIS_TTL, 10) || 43200,
    },
});
