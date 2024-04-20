import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritePostsService {
    constructor(private prismaService: PrismaService) {}

    async toggleFavorite(id: number, userId: number): Promise<void> {
        const post = await this.prismaService.post.findUnique({
            where: { id }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        const isLiked = await this.prismaService.likesOnPosts.findUnique({
            where: {
                userId_postId: {
                    postId: id,
                    userId
                }
            }
        });

        if (isLiked) {
            await this.unlike(id, userId);
        } else {
            await this.like(id, userId);
        }
    }

    private async unlike(postId: number, userId: number): Promise<void> {
        await this.prismaService.likesOnPosts.delete({
            where: {
                userId_postId: {
                    postId,
                    userId
                }
            }
        });

        await this.prismaService.post.update({
            where: { id: postId },
            data: {
                likesCount: {
                    decrement: 1
                }
            }
        });
    }

    private async like(postId: number, userId: number): Promise<void> {
        await this.prismaService.likesOnPosts.create({
            data: {
                postId,
                userId,
            }
        });

        await this.prismaService.post.update({
            where: { id: postId },
            data: {
                likesCount: {
                    increment: 1
                }
            }
        });
    }
}
