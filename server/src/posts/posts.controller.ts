import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { PostsService } from './posts.service';
import { Category, Post as Article, Comment } from '@prisma/client';
import { GetPostsQueryParams } from './dto/get.posts.query.params';
import { SearchPostsQueryParams } from './dto/search.posts.query.params';
import { AuthGuard } from 'src/auth/auth.guard';
import { NoFilesInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { FavoritePostsService } from './favorite-posts.service';
import { AddCommentDto } from './dto/add.comment.dto';
import { CommentsService } from './comments.service';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
        private favoritePostsService: FavoritePostsService,
        private commentsService: CommentsService
    ) {}

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

    @UseGuards(AuthGuard)
    @UseInterceptors(NoFilesInterceptor())
    @Patch(":id")
    async edit(@Request() req, @Param("id", ParseIntPipe) id: number, @Body() body: EditPostDto) {
        return await this.postsService.edit(id, req.user.id, body);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return await this.postsService.delete(req.user.id, id);
    }

    @UseGuards(AuthGuard)
    @Patch(":id/toggleFavorite")
    async toggleFavorite(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return await this.favoritePostsService.toggleFavorite(id, req.user.id);
    }

    @Get(":id/comments")
    async getComments(@Param("id", ParseIntPipe) id: number): Promise<Comment[]> {
        return await this.commentsService.get(id);
    }

    @UseGuards(AuthGuard)
    @Post(":id/comments") 
    async addComment(@Request() req, @Param("id", ParseIntPipe) id: number, @Body() body: AddCommentDto): Promise<void> {
        return await this.commentsService.add(id, req.user.id, body);
    }

    @UseGuards(AuthGuard)
    @Delete(":id/comments/:commentId")
    async deleteComment(@Request() req, @Param("id", ParseIntPipe) id: number, @Param("commentId", ParseIntPipe) commentId: number): Promise<void> {
        return await this.commentsService.delete(id, req.user.id, commentId);
    }
}
