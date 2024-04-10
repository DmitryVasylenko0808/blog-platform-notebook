import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { GetPostsQueryParams } from './dto/get.posts.query.params';

@Injectable()
export class PostsService {
    constructor(private prismaService: PrismaService) {}

    async get(query: GetPostsQueryParams): Promise<Omit<Post, "body">[]> {
        const { type, offset, limit } = query;
        const filter = this.buildFilter(type);

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

        const res = this.excludePostBody(posts);

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

        return post;
    }

    async getByAuthorId(id: number): Promise<Omit<Post, "body">[]> {
        const posts = await this.prismaService.post.findMany({
            where: {
                authorId: id
            }
        });

        const res = this.excludePostBody(posts);

        return res;
    } 

    private buildFilter(type?: GetPostsQueryParams["type"]) {
        let filter;

        if (type === "popular") {
            filter = {
                orderBy: {
                    viewsCount: "desc"
                }
            }
        } else if (type === "recently") {
            filter = {
                orderBy: {
                    createdAt: "desc"
                }
            }
        } else if (type === "featured") {
            const currentDate = new Date();
            const dateStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
            const dateEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1);

            filter = {
                where: {
                    createdAt: {
                        gte: dateStart,
                        lte: dateEnd
                    }
                }
            }
        } else {
            return null;
        }

        return filter;
    }

    private excludePostBody(posts: Post[]) {
        const res = posts.map(item => {
            let p: Omit<Post, "body"> = {} as Omit<Post, "body">;
            for(const key of Object.keys(item)) {
                if (key === "body") {
                    continue;
                }

                p[key] = item[key];
            }

            return p;
        });

        return res;
    }
}
