import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { PrismaService } from 'src/prisma.service';
import { CheckPostExistsMiddleware } from './middlewares/check-post-exists.middleware';
import { CheckCommenttExistsMiddleware } from './middlewares/check-comment-exists.middleware';

@Module({
    providers: [CommentsService, PrismaService],
    controllers: [CommentsController]
})
export class CommentsModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(CheckPostExistsMiddleware)
            .forRoutes(CommentsController);

        consumer
            .apply(CheckCommenttExistsMiddleware)
            .exclude(
                {
                    path: "posts/:postId/comments", method: RequestMethod.GET
                },
                {
                    path: "posts/:postId/comments", method: RequestMethod.POST
                }
            )
            .forRoutes(CommentsController);
        
    }
}
