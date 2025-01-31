import { origworld } from './origworld';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AppService } from './app.service';
import { Palier } from './graphql';
import {Logger} from "@nestjs/common";
import {AppController} from "./app.controller";
@Resolver('World')
export class GraphQlResolver {
    private readonly logger = new Logger('GraphQlResolver');

    constructor(private service: AppService) {}

    @Query()
    async getWorld(@Args('user') user: string) {

        const world = this.service.readUserWorld(user);
        return world;
    }
}