import { Inject, Injectable } from "@nestjs/common";
import { Client } from "cassandra-driver";
import { Url } from "src/models/url.model";

export abstract class UrlRepository {
    abstract getByUrl(url: string): Promise<Url | null>;
}

@Injectable()
export class UrlRepositoryImplementation implements UrlRepository {
    constructor(
        @Inject('CASSANDRA_CLIENT') private readonly client: Client
    ) { }

    async getByUrl(url: string): Promise<Url | null> {
        const query = 'SELECT * FROM urls WHERE shortUrl = ?';
        const result = await this.client.execute(query, [url], { prepare: true });

        if (result.rowLength === 0) return null;

        const row = result.first();
        return {
            shortUrl: row.get('shorturl'),
            longUrl: row.get('longurl'),
        } as Url;
    }

    async saveUrl(url: Url): Promise<void> {
        const query = 'INSERT INTO urls (shortUrl, longUrl) VALUES (?, ?)';
        await this.client.execute(query, [url.shortUrl, url.longUrl], { prepare: true });
    }
}
