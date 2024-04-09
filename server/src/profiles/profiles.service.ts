import { Injectable, NotFoundException } from '@nestjs/common';
import { Profile } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class ProfilesService {
    constructor(private prismaService: PrismaService) {}

    async get(id: number): Promise<Profile> {
        const profile = await this.prismaService.profile.findUnique({
            where: { id }
        });

        console.log(profile);

        if(!profile) {
            throw new NotFoundException("Profile is not found");
        }

        return profile;
    }
}
