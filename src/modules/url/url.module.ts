import { Module } from '@nestjs/common';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlRepository, UrlRepositoryImplementation } from 'src/repositories/url.repository';


@Module({
  imports: [],
  controllers: [UrlController],
  providers: [
    UrlService,
    { provide: UrlRepository, useClass: UrlRepositoryImplementation }
  ],
})
export class UrlModule {}
