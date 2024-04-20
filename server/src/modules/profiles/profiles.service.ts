import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { EditProfileDto } from './dto/edit.profile.dto';

@Injectable()
export class ProfilesService {
    constructor(private prismaService: PrismaService) {}

    async get(id: number): Promise<Profile> {
        const profile = await this.prismaService.profile.findUnique({
            where: { id }
        });

        if(!profile) {
            throw new NotFoundException("Profile is not found");
        }

        return profile;
    }
    
    async edit(id: number, body: EditProfileDto, avatarFilename?: string): Promise<void> {
        const profile = await this.prismaService.profile.findUnique({
            where: { id }
        });

        if(!profile) {
            throw new NotFoundException("Profile is not found");
        }

        await this.prismaService.profile.update({
            where: { id },
            data: { 
                ...body,
                avatarUrl: avatarFilename
            }
        });
    }
}
