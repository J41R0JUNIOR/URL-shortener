import { Module } from '@nestjs/common';
import { UrlModule } from 'src/modules/url/url.module';
import { CassandraModule } from '../../infra/cassandra/cassandra.module';
import { ConfigModule } from '@nestjs/config';
import { RedisModule } from 'src/infra/redis/redis.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UrlModule,
    CassandraModule,
    RedisModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
