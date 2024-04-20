import { Body, Controller, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Patch, Request, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Profile } from '@prisma/client';
import { EditProfileDto } from './dto/edit.profile.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/config/multer.config';
import { AuthGuard } from '../auth/auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private profilesService: ProfilesService) {}

    @Get(":id")
    async get(@Param("id", ParseIntPipe) id: number): Promise<Profile> {
        return await this.profilesService.get(id);
    }

    @UseGuards(AuthGuard)
    @UseInterceptors(FileInterceptor("avatarFile", { storage: avatarsStorage }))
    @Patch()
    async edit(
        @Request() req, 
        @Body() body: EditProfileDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({ 
                    fileIsRequired: false,
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY 
                })
        ) file?: Express.Multer.File
    ): Promise<void> {
        await this.profilesService.edit(req.user.id, body, file?.filename);
    } 
}
