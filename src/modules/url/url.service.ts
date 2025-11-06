import { Injectable, NotFoundException } from "@nestjs/common";
import { Url } from "src/models/url.model";
import { IdRepository } from "src/repositories/id.repository";
import { UrlRepository } from "src/repositories/url.repository";
import encodeBase62 from "src/util/encodeBase62";

@Injectable()
export class UrlService {
    constructor(
        private readonly urlRepository: UrlRepository,
        private readonly idRepository: IdRepository,
    ) { }

    async setUrl(longUrl: string) {

        if (!/^https?:\/\//i.test(longUrl)) {
            longUrl = `https://${longUrl}`;
        }

        const id = await this.idRepository.getId();
        const shortUrl = encodeBase62(id);
        const url = new Url(shortUrl, longUrl);

        const x = await this.urlRepository.saveUrl(url);

        return {
            shortUrl: `${process.env.API_URL}/url-shortener/` + x?.shortUrl
        };
    }

    async getUrl(shortUrl: string) {
        const url = await this.urlRepository.getByUrl(shortUrl);

        if (!url) {
            throw new NotFoundException('Url not found')
        }

        return url.longUrl
    }
}