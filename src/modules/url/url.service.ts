import { Injectable } from "@nestjs/common";
import { UrlRepository } from "src/repositories/url.repository";

@Injectable()
export class UrlService {
    constructor(private readonly urlRepository: UrlRepository) {}

    async getUrl(url: string) {
        return await this.urlRepository.getByUrl(url);
    }
}