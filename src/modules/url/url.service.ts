import { Injectable, NotFoundException } from "@nestjs/common";
import { Url } from "src/models/url.model";
import { IdRepository } from "src/repositories/id.repository";
import { UrlRepository } from "src/repositories/url.repository";

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
        console.log("receba o id: "+id)
        const shortUrl = encodeBase62(id);
        console.log("receba o id encodado para 62:" + shortUrl);
        const url = new Url(shortUrl, longUrl);
        console.log(url)

        return await this.urlRepository.saveUrl(url);
    }

    async getUrl(shortUrl: string) {
        const url = await this.urlRepository.getByUrl(shortUrl);

        if (!url) {
            throw new NotFoundException('Url not found')
        }

        return url.longUrl
    }
}

function encodeBase62(num: number): string {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    let base62 = '';
    while (num) {
        base62 = chars[num % 62] + base62;
        num = Math.floor(num / 62);
    }
    return base62;
}
