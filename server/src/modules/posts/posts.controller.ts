import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, 
    ParseIntPipe, Patch, Post, Query, Request, UploadedFile, UseGuards, UseInterceptors 
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Post as PostModel } from '@prisma/client';
import { GetPostsPaginationParams, GetPostsQueryParams } from './dto/get.posts.query.params';
import { SearchPostsQueryParams } from './dto/search.posts.query.params';
import { FileInterceptor } from '@nestjs/platform-express';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';
import { FavoritePostsService } from './favorite-posts.service';
import { postsStorage } from 'src/config/multer.config';
import { AuthGuard } from '../auth/auth.guard';
import { GetPostsResponse } from './types';

@Controller('posts')
export class PostsController {
    constructor(
        private postsService: PostsService,
        private favoritePostsService: FavoritePostsService
    ) {}

    @Get()
    async get(@Query() query: GetPostsQueryParams): Promise<GetPostsResponse> {
        return await this.postsService.get(query);
    }

    @Get(":id/details")
    async getById(@Param("id", ParseIntPipe) id: number): Promise<PostModel> {
        return await this.postsService.getOne(id);
    }

    @Get(":id/related")
    async getRelated(@Param("id", ParseIntPipe) id: number, @Query() query: GetPostsPaginationParams) {
        return await this.postsService.getRelated(id, query.offset, query.limit);
    }

    @Get("search")
    async search(@Query() query: SearchPostsQueryParams): Promise<Omit<PostModel, "body">[]> {
        return await this.postsService.search(query);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("imageFile", { storage: postsStorage }))
    @Post() 
    async create(
        @Request() req, 
        @Body() body: CreatePostDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) file?: Express.Multer.File
    ): Promise<void> {
        return await this.postsService.create(req.user.id, body, file?.filename);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("imageFile", { storage: postsStorage }))
    @Patch(":id")
    async edit(
        @Request() req, 
        @Param("id", ParseIntPipe) id: number, 
        @Body() body: EditPostDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
                })
        ) file?: Express.Multer.File
    ) {
        return await this.postsService.edit(id, req.user.id, body, file?.filename);
    }

    @UseGuards(AuthGuard)
    @Delete(":id")
    async delete(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return await this.postsService.delete(req.user.id, id);
    }

    @UseGuards(AuthGuard)
    @Patch(":id/toggle-favorite")
    async toggleFavorite(@Request() req, @Param("id", ParseIntPipe) id: number): Promise<void> {
        return await this.favoritePostsService.toggleFavorite(id, req.user.id);
    }
}
