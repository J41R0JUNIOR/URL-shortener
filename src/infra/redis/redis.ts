import { createClient } from 'redis';

export const redisClientProvider = {
    provide: 'REDIS_CLIENT',
    useFactory: async () => {
        const client = createClient({
            url: process.env.REDIS_URL
        });

        client.on('error', err => console.log('Redis Client Error', err));

        await client.connect();

        console.log("redis connected");

        const exists = await client.exists('url:id');
        if (!exists) {
            await client.set('url:id', 10000);
        }

        return client;
    }
}