import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from '@prisma/client';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get(":id")
    async get(@Param("id", ParseIntPipe) id: number): Promise<Profile> {
        return await this.profilesService.get(id);
    }
}
