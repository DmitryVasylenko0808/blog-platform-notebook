import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddCommentDto } from './dto/add.comment.dto';
import { Comment } from '@prisma/client';

@Injectable()
export class CommentsService {
    constructor(private prismaService: PrismaService) {}

    async get(postId: number, offset: number, limit: number): Promise<Comment[]> {
        const post = await this.prismaService.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        const comments = await this.prismaService.comment.findMany({
            skip: Number(offset),
            take: Number(limit),
            where: { postId },
            include: {
                author: {
                    select: {
                        id: true,
                        login: true,
                        profile: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        children: true
                    }
                }
            },
            orderBy: {
                parentId: "desc"
            }
        });

        if (!comments.length) {
            return [];
        }

        return comments;
    }

    async getAnswers(postId: number, commentId: number): Promise<Comment[]> {
        const post = await this.prismaService.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        const comment = await this.prismaService.comment.findUnique({
            where: {
                id: commentId,
                postId
            }
        });

        if (!comment) {
            throw new NotFoundException("Comment is not found");
        }

        const answers = await this.prismaService.comment.findMany({
            where: {
                postId,
                parentId: commentId
            },
            include: {
                author: {
                    select: {
                        id: true,
                        login: true,
                        profile: {
                            select: {
                                avatarUrl: true
                            }
                        }
                    }
                },
                _count: {
                    select: {
                        children: true
                    }
                }
            },
            orderBy: {
                parentId: "desc"
            }
        });

        return answers;
    }

    async add(postId: number, userId: number, body: AddCommentDto): Promise<void> {
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

    async delete(postId: number, userId: number, commentId: number): Promise<void> {
        const post = await this.prismaService.post.findUnique({
            where: {
                id: postId
            }
        });

        if (!post) {
            throw new NotFoundException("Post is not found")
        }

        const comment = await this.prismaService.comment.findUnique({
            where: {
                id: commentId,
                authorId: userId
            }
        });

        if (!comment) {
            throw new NotFoundException("Comment is not found")
        }

        await this.prismaService.comment.delete({
            where: {
                id: commentId,
                authorId: userId
            }
        });

        if (!comment.parentId) {
            await this.prismaService.post.update({
                where: {
                    id: postId
                },
                data: {
                    commentsCount: {
                        decrement: 1
                    }
                }
            });
        }
    }
}
