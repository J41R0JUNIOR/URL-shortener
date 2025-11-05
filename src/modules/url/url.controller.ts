import { Body, Controller, Get, Param, Post, Redirect } from "@nestjs/common";
import { UrlService } from "./url.service";

@Controller('api/url-shortener')
export class UrlController{
    constructor(
        private readonly urlService: UrlService
    ) {}

    @Post()
    async setUrl(@Body('url') url: string) {
        return await this.urlService.setUrl(url);
    }

    @Get(':url')
    @Redirect()
    async getUrl(@Param('url') shortUrl: string) {
        const longUrl = await this.urlService.getUrl(shortUrl);

        return { url: longUrl, statusCode: 302 };
    }
}