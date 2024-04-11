import { Body, Controller, Get, Param, ParseIntPipe, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Category, Post as Article } from '@prisma/client';
import { GetPostsQueryParams } from './dto/get.posts.query.params';
import { SearchPostsQueryParams } from './dto/search.posts.query.params';
import { AuthGuard } from 'src/auth/auth.guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create.post.dto';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {}

    @Get()
    async get(@Query() query: GetPostsQueryParams): Promise<Omit<Article, "body">[]> {
        return await this.postsService.get(query);
    }

    @Get("one/:id")
    async getById(@Param("id", ParseIntPipe) id: number): Promise<Article> {
        return await this.postsService.getOne(id);
    }

    @Get("author/:authorId") 
    async getByAuthorId(@Param("authorId", ParseIntPipe) authorId: number): Promise<Omit<Article, "body">[]> {
        return await this.postsService.getByAuthorId(authorId);
    }

    @Get("related/:id")
    async getRelated(@Param("id", ParseIntPipe) id: number, @Query("limit", ParseIntPipe) limit: number) {
        return await this.postsService.getRelated(id, limit);
    }

    @Get("search")
    async search(@Query() query: SearchPostsQueryParams): Promise<Omit<Article, "body">[]> {
        return await this.postsService.search(query);
    }

    @Get("categories")
    async getCategories(): Promise<Category[]> {
        return await this.postsService.getCategories();
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(NoFilesInterceptor())
    @Post() 
    async create(@Request() req, @Body() body: CreatePostDto): Promise<void> {
        return await this.postsService.create(req.user.id, body);
    }
}
