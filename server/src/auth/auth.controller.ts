import { Body, Controller, Get, HttpCode, Post, UseGuards, Request, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { SignInDto } from './dto/sign.in.dto';
import { AuthGuard } from './auth.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { avatarsStorage } from 'src/config/multer.config';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("sign-up") 
    @UseInterceptors(FileInterceptor("avatarFile", { storage: avatarsStorage }))
    async signUp(
        @Body() body: SignUpDto,
        @UploadedFile(
            new ParseFilePipeBuilder()
                .addFileTypeValidator({ fileType: "jpeg" })
                .build({ 
                    fileIsRequired: false, 
                    errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY 
                })
        ) file?: Express.Multer.File,
    ): Promise<void> {
        return await this.authService.signUp(body, file?.filename);
    }

    @Post("sign-in")
    @HttpCode(200)
    async signIn(@Body() body: SignInDto): Promise<{ token: string }> {
        return await this.authService.signIn(body);
    } 

    @UseGuards(AuthGuard)
    @Get("me")
    getMe(@Request() req) {
        return req.user;
    }
}
