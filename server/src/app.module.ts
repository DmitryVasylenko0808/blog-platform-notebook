import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';
import { PostsModule } from './posts/posts.module';

@Module({
  imports: [AuthModule, ProfilesModule, PostsModule],
  providers: [PrismaService]
})
export class AppModule {}
