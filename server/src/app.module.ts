import { Module } from '@nestjs/common';
import { PrismaService } from "./prisma.service";
import { AuthModule } from './auth/auth.module';
import { ProfilesModule } from './profiles/profiles.module';

@Module({
  imports: [AuthModule, ProfilesModule],
  providers: [PrismaService]
})
export class AppModule {}
