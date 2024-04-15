import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { FavoritePostsService } from './favorite-posts.service';
import { CommentsModule } from './comments/comments.module';

@Module({
  providers: [
    PostsService, 
    PrismaService, 
    FavoritePostsService
  ],
  controllers: [PostsController],
  imports: [CommentsModule]
})
export class PostsModule {}
