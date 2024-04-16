import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { PostsModule } from './modules/posts/posts.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfilesModule } from './modules/profiles/profiles.module';

@Module({
  imports: [AuthModule, ProfilesModule, PostsModule],
  providers: [PrismaService]
})
export class AppModule {}
