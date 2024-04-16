import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CheckPostExistsMiddleware implements NestMiddleware {
    constructor(private prismaService: PrismaService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { postId } = req.params;

        const post = await this.prismaService.post.findUnique({
            where: {
                id: Number(postId)
            }
        });

        if (!post) {
            throw new NotFoundException("Post is not found");
        }

        next();
    }
}