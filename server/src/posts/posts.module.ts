import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { PrismaService } from 'src/prisma.service';
import { FavoritePostsService } from './favorite-posts.service';

@Module({
  providers: [PostsService, PrismaService, FavoritePostsService],
  controllers: [PostsController]
})
export class PostsModule {}
