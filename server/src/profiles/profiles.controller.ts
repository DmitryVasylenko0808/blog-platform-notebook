import { Body, Controller, Get, Param, ParseIntPipe, Patch, Request, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { EditProfileDto } from './dto/edit.profile.dto';
import { NoFilesInterceptor } from '@nestjs/platform-express';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get(":id")
    async get(@Param("id", ParseIntPipe) id: number): Promise<Profile> {
        return await this.profilesService.get(id);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(NoFilesInterceptor())
    @Patch()
    async edit(@Request() req, @Body() body: EditProfileDto): Promise<void> {
        await this.profilesService.edit(req.user.id, body);
    } 
}
