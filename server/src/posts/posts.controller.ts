import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Category, Post } from '@prisma/client';
import { GetPostsQueryParams } from './dto/get.posts.query.params';
import { SearchPostsQueryParams } from './dto/search.posts.query.params';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async get(@Query() query: GetPostsQueryParams): Promise<Omit<Post, "body">[]> {
        return await this.postsService.get(query);
    }

    @Get("one/:id")
    async getById(@Param("id", ParseIntPipe) id: number): Promise<Post> {
        return await this.postsService.getOne(id);
    }

    @Get("author/:authorId") 
    async getByAuthorId(@Param("authorId", ParseIntPipe) authorId: number): Promise<Omit<Post, "body">[]> {
        return await this.postsService.getByAuthorId(authorId);
    }

    @Get("search")
    async search(@Query() query: SearchPostsQueryParams): Promise<Omit<Post, "body">[]> {
        return await this.postsService.search(query);
    }

    @Get("categories")
    async getCategoris(): Promise<Category[]> {
        return await this.postsService.getCategories();
    }
}
