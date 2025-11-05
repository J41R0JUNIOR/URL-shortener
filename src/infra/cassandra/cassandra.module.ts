import { Module, Global } from '@nestjs/common';
import 'dotenv/config';
import { cassandraClientProvider } from './cassandra';

@Global()
@Module({
  providers: [cassandraClientProvider],
  exports: [cassandraClientProvider],
})
export class CassandraModule { }
