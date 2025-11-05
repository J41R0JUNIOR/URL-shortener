import { Inject, Injectable } from "@nestjs/common";
import { createClient } from "redis";
import { Url } from "src/models/url.model";

export abstract class IdRepository {
    abstract getId(): Promise<number>;
}

@Injectable()
export class IdRepositoryImplementation implements IdRepository {
    constructor(
    @Inject('REDIS_CLIENT') private readonly client: ReturnType<typeof createClient>,
) {}

    async getId(): Promise<number> {
        const id = await this.client.incr('url:id');
        return id;
    }
}
