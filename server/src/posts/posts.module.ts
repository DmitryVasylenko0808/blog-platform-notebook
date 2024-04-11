import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { FavoritePostsService } from './favorite-posts.service';
import { CommentsService } from './comments.service';

@Module({
  providers: [
    PostsService, 
    PrismaService, 
    FavoritePostsService, 
    CommentsService
  ],
  controllers: [PostsController]
})
export class PostsModule {}
