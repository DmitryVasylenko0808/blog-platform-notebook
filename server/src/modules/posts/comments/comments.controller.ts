import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AddCommentDto } from './dto/add.comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GetCommentsQueryParams } from './dto/get.comments.query.params';
import { GetCommentsResponse } from './types';

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async getComments(
        @Param("postId", ParseIntPipe) postId: number, 
        @Query() query: GetCommentsQueryParams
    ): Promise<GetCommentsResponse> {
        return await this.commentsService.get(postId, query.offset, query.limit);
    }

    @Get(":commentId/answers")
    async getAnswers(
        @Param("postId", ParseIntPipe) postId: number,
        @Param("commentId", ParseIntPipe) commentId: number
    ): Promise<GetCommentsResponse> {
        return await this.commentsService.getAnswers(postId, commentId);
    }

    @UseGuards(AuthGuard)
    @Post() 
    async addComment(
        @Request() req, 
        @Param("postId", ParseIntPipe) postId: number, 
        @Body() body: AddCommentDto
    ): Promise<void> {
        return await this.commentsService.add(postId, req.user.id, body);
    }

    @UseGuards(AuthGuard)
    @Post(":commentId/answers") 
    async addAnswer(
        @Request() req, 
        @Param("postId", ParseIntPipe) postId: number, 
        @Param("commentId", ParseIntPipe) commentId: number,
        @Body() body: AddCommentDto
    ): Promise<void> {
        return await this.commentsService.addAnswer(postId, req.user.id, commentId, body);
    }

    @UseGuards(AuthGuard)
    @Delete(":commentId")
    async deleteComment(
        @Request() req, 
        @Param("postId", ParseIntPipe) postId: number, 
        @Param("commentId", ParseIntPipe) commentId: number
    ): Promise<void> {
        return await this.commentsService.delete(postId, req.user.id, commentId);
    }
}
