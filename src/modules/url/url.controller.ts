import { Controller, Get, Param } from "@nestjs/common";
import { UrlService } from "./url.service";

@Controller('api/url-shortener')
export class UrlController{
    constructor(
        private readonly urlService: UrlService
    ) {}

    @Get(':url')
    async getUrl(@Param('url') url: string) {
        return await this.urlService.getUrl(url);
    }
}