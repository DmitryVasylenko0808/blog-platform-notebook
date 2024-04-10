import { Controller, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post } from '@prisma/client';
import { GetPostsQueryParams } from './dto/get.posts.query.params';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get("")
    async get(@Query() query: GetPostsQueryParams): Promise<Omit<Post, "body">[]> {
        return await this.postsService.get(query);
    }

    @Get(":id")
    async getById() {}

    @Get("search")
    async search() {}

    @Get("author/:authorId") 
    async getByAuthorId() {}
}
