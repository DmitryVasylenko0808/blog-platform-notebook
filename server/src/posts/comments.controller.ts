import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddCommentDto } from './dto/add.comment.dto';
import { CommentsService } from './comments.service';
import { Comment } from '@prisma/client';

@Controller('posts/:postId/comments')
export class CommentsController {
    constructor(private commentsService: CommentsService) {}

    @Get()
    async getComments(@Param("postId", ParseIntPipe) postId: number): Promise<Comment[]> {
        return await this.commentsService.get(postId);
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
    @Delete()
    async deleteComment(
        @Request() req, 
        @Param("postId", ParseIntPipe) postId: number, 
        @Param("commentId", ParseIntPipe) commentId: number
    ): Promise<void> {
        return await this.commentsService.delete(postId, req.user.id, commentId);
    }
}
