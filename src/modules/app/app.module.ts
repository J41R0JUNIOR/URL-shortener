import { Module } from '@nestjs/common';
import { UrlModule } from 'src/modules/url/url.module';
import { CassandraModule } from '../cassandra/cassandra.module';
import { ConfigModule } from '@nestjs/config';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UrlModule,
    CassandraModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
