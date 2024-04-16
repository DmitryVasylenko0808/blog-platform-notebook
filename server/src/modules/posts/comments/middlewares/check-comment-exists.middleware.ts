import { Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CheckCommenttExistsMiddleware implements NestMiddleware {
    constructor(private prismaService: PrismaService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        const { commentId } = req.params;

        const comment = await this.prismaService.comment.findUnique({
            where: {
                id: Number(commentId)
            }
        });

        if (!comment) {
            throw new NotFoundException("Comment is not found");
        }

        next();
    }
}