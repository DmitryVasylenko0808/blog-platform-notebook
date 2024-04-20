import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetPostsQueryParams } from './dto/get.posts.query.params';
import { SearchPostsQueryParams } from './dto/search.posts.query.params';
import { buildFilter, excludePostBody } from './posts.helpers';
import { CreatePostDto } from './dto/create.post.dto';
import { EditPostDto } from './dto/edit.post.dto';

@Injectable()
export class PostsService {
    constructor(private prismaService: PrismaService) {}

    async get(query: GetPostsQueryParams): Promise<Omit<Post, "body">[]> {
        const { offset, limit, ...filterArg } = query;
        const filter = buildFilter(filterArg);

        console.log(filterArg);

        const posts = await this.prismaService.post.findMany({
            skip: Number(offset),
            take: Number(limit), 
            include: {
                author: {
                    select: {
                        id: true,
                        login: true 
                    }
                },
                category: true
            },
            ...filter
        });

        const res = excludePostBody(posts);

        return res;
    }

    async getOne(id: number): Promise<Post> {
        const post = await this.prismaService.post.findUnique({
            where: { id },
            include: {
                author: {
                    select: {
                        id: true,
                        login: true
                    }
                },
                category: true
            }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        await this.prismaService.post.update({
            where: { id },
            data: {
                viewsCount: {
                    increment: 1
                }
            }
        });

        return post;
    }

    async getRelated(id: number, offset: number, limit: number): Promise<Omit<Post, "body">[]> {
        const post = await this.prismaService.post.findUnique({
            where: { id }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        const posts = await this.prismaService.post.findMany({
            skip: Number(offset),
            take: Number(limit),
            where: {
                categoryId: post.categoryId,
                id: {
                    not: post.id
                } 
            },
            orderBy: {
                likesCount: "desc"
            }
        });

        const res = excludePostBody(posts);

        return res;
    }

    async search(query: SearchPostsQueryParams): Promise<Omit<Post, "body">[]> {
        const { value, limit, offset } = query;

        const posts = await this.prismaService.post.findMany({
            skip: Number(offset),
            take: Number(limit),
            where: {
                title: {
                    contains: value
                }
            }
        });

        const res = excludePostBody(posts);

        return res;
    }

    async create(authorId: number, body: CreatePostDto, imageFilename?: string): Promise<void> {
        await this.prismaService.post.create({
            data: { 
                title: body.title,
                description: body.description,
                body: body.body,
                imageUrl: imageFilename,
                author: {
                    connect: {
                        id: authorId
                    }
                },
                category: {
                    connect: {
                        id: Number(body.categoryId)
                    }
                }
            }
        });
    }

    async edit(id: number, authorId: number, body: EditPostDto, imageFilename?: string): Promise<void> {
        const post = await this.prismaService.post.findUnique({
            where: {
                id,
                authorId,
            },   
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        await this.prismaService.post.update({
            where: {
                id,
                authorId,
            },
            data: {
                ...body,
                imageUrl: imageFilename,
                categoryId: Number(body.categoryId)
            }
        });
    }

    async delete(authorId: number, id: number): Promise<void> {
        const post = await this.prismaService.post.findUnique({
            where: { id, authorId }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        await this.prismaService.post.delete({
            where: { id }
        });
    }
}
