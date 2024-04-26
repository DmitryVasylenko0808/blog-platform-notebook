import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddCommentDto } from './dto/add.comment.dto';
import { Comment } from '@prisma/client';
import { GetAnswersResponse, GetCommentsResponse } from './types';

@Injectable()
export class CommentsService {
    constructor(private prismaService: PrismaService) {}

    async get(postId: number, offset: number, limit: number): Promise<GetCommentsResponse> {
        const comments = await this.prismaService.comment.findMany({
            skip: Number(offset),
            take: Number(limit),
            where: { 
                postId,
                parentId: null 
            },
            include: {
                author: {
                    select: {
                        id: true,
                        login: true,
                        profile: {
                            select: {
                                firstName: true,
                                secondName: true,
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

        const totalCount = await this.prismaService.comment.count({
            where: {
                postId,
                parentId: null
            }
        });

        return {
            totalCount,
            comments
        };
    }

    async getAnswers(postId: number, commentId: number, offset: number, limit: number): Promise<GetAnswersResponse> {
        const answers = await this.prismaService.comment.findMany({
            skip: Number(offset),
            take: Number(limit),
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
                                firstName: true,
                                secondName: true,
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

        const totalCount = await this.prismaService.comment.count({
            where: {
                postId,
                parentId: commentId
            }
        });

        return {
            totalCount,
            answers
        };
    }

    async add(postId: number, userId: number, body: AddCommentDto): Promise<void> {
        const { body: text } = body;

        await this.prismaService.comment.create({
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
        });
        
        await this.prismaService.post.update({
            where: { id: postId },
            data: {
                commentsCount: {
                    increment: 1
                }
            }
        });
    }

    async addAnswer(postId: number, userId: number, commentId: number, body: AddCommentDto): Promise<void> {
        const { body: text } = body;

        await this.prismaService.comment.create({
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
                parent: {
                    connect: {
                        id: commentId
                    }
                },
                body: text
            }
        });
    }

    async delete(postId: number, userId: number, commentId: number): Promise<void> {
        const comment = await this.prismaService.comment.delete({
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
