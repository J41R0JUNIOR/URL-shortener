import { Module, Global } from '@nestjs/common';
import 'dotenv/config';
import { redisClientProvider } from './redis';

@Global()
@Module({
  providers: [redisClientProvider],
  exports: [redisClientProvider],
})
export class RedisModule { }
