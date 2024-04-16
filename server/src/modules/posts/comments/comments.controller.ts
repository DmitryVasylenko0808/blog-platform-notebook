import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Request, Query } from '@nestjs/common';
import { AddCommentDto } from './dto/add.comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';
import { AuthGuard } from 'src/modules/auth/auth.guard';
import { GetCommentsQueryParams } from './dto/get.comments.query.params';

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async getComments(
        @Param("postId", ParseIntPipe) postId: number, 
        @Query() query: GetCommentsQueryParams
    ): Promise<Comment[]> {
        return await this.commentsService.get(postId, query);
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
    @Delete(":commentId")
    async deleteComment(
        @Request() req, 
        @Param("postId", ParseIntPipe) postId: number, 
        @Param("commentId", ParseIntPipe) commentId: number
    ): Promise<void> {
        return await this.commentsService.delete(postId, req.user.id, commentId);
    }
}
