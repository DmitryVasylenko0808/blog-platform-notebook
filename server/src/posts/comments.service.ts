import { Injectable, NotFoundException } from '@nestjs/common';
import { Comment } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { AddCommentDto } from './dto/add.comment.dto';

@Injectable()
export class CommentsService {
    constructor(private prismaService: PrismaService) {}

    async add(postId: number, userId: number, body: AddCommentDto) {
        const { body: text, parentId } = body;

        const post = await this.prismaService.post.findUnique({
            where: { id: postId }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        const addCommentArgs: any = {
            data: {
                post: {
                    connect: {
                        id: postId
                    }
                },
                author: {
                    connect: {
                        id: userId
                    }
                },
                body: text
            }
        };

        if (parentId) {
            addCommentArgs.data.parent = {
                connect: {
                    id: parentId
                }
            }
        }

        await this.prismaService.comment.create(addCommentArgs);

        if (!parentId) {
            await this.prismaService.post.update({
                where: { id: postId },
                data: {
                    commentsCount: {
                        increment: 1
                    }
                }
            });
        }
    }
}
