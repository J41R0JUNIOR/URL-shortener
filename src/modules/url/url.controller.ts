import { Body, Controller, Get, Param, Post, Redirect } from "@nestjs/common";
import { UrlService } from "./url.service";

@Controller('api/url-shortener')
export class UrlController{
    constructor(
        private readonly urlService: UrlService
    ) {}

    @Post()
    async setUrl(@Body('url') url: string) {
        console.log(url)
        return await this.urlService.setUrl(url);
    }

    @Get(':url')
    @Redirect()
    async getUrl(@Param('url') shortUrl: string) {
        const longUrl = await this.urlService.getUrl(shortUrl);
        console.log("url =", longUrl)

        return { url: longUrl, statusCode: 302 };
    }
}