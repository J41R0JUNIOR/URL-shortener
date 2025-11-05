import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository, UrlRepositoryImplementation } from 'src/repositories/url.repository';
import { redisClientProvider } from 'src/infra/redis/redis';
import { IdRepository, IdRepositoryImplementation } from 'src/repositories/id.repository';


@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    UrlService,
    { provide: UrlRepository, useClass: UrlRepositoryImplementation },
    { provide: IdRepository, useClass: IdRepositoryImplementation }
  ],
})
export class UrlModule {}
