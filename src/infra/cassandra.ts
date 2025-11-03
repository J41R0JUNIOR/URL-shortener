import { auth, Client } from "cassandra-driver";

export const cassandraClientProvider = {
  provide: 'CASSANDRA_CLIENT',
  useFactory: async () => {
    const client = new Client({
      contactPoints: [process.env.CASSANDRA_CONTAINER || 'cassandra'],
      localDataCenter: process.env.CASSANDRA_DC || 'dc1',
      protocolOptions: { port: Number(process.env.CASSANDRA_PORT) || 9042 },
      authProvider: new auth.PlainTextAuthProvider(
        process.env.CASSANDRA_USER || 'cassandra',
        process.env.CASSANDRA_PASSWORD || 'cassandra',
      ),
    });

    await client.connect();
    console.log('Cassandra connected');

    await client.execute(`
  CREATE KEYSPACE IF NOT EXISTS ${process.env.CASSANDRA_KEYSPACE || 'url_shortener'}
  WITH replication = {'class': 'SimpleStrategy', 'replication_factor': 1};
`);

    await client.execute(`USE ${process.env.CASSANDRA_KEYSPACE || 'url_shortener'}`);

    await client.execute(`
  CREATE TABLE IF NOT EXISTS urls (
    shortUrl TEXT PRIMARY KEY,
    longUrl TEXT
  )
`);
    console.log('Url table created');

    return client;
  },
};