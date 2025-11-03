import { Module, Global } from '@nestjs/common';
import 'dotenv/config';
import { cassandraClientProvider } from 'src/infra/cassandra';

@Global()
@Module({
  providers: [cassandraClientProvider],
  exports: [cassandraClientProvider],
})
export class CassandraModule { }
