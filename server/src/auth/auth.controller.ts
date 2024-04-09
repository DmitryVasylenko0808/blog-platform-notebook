import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/sign.up.dto';
import { SignInDto } from './dto/sign.in.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("sign-up") 
    async signUp(@Body() body: SignUpDto): Promise<void> {
        return await this.authService.signUp(body);
    }

    @Post("sign-in")
    @HttpCode(200)
    async signIn(@Body() body: SignInDto): Promise<{ token: string }> {
        return await this.authService.signIn(body);
    } 
}
