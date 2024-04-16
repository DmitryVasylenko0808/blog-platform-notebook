import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { CategoriesModule } from './modules/categories/categories.module';

@Module({
  imports: [
    AuthModule, 
    ProfilesModule, 
    PostsModule, 
    CategoriesModule
  ],
  providers: [PrismaService]
})
export class AppModule {}
