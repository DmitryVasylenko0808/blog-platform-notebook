import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign.up.dto';
import { SignInDto } from './dto/sign.in.dto';

@Injectable()
export class AuthService {
    constructor(
        private prismaService: PrismaService, 
        private jwtService: JwtService
    ) {}

    async signUp(data: SignUpDto, avatarFileName?: string): Promise<void> {
        const { login, password, ...other } = data;
        const { avatarFile, ...profile } = other;

        console.log(profile);
        console.log(avatarFileName);

        const user = await this.prismaService.user.findUnique({
            where: { login }
        });

        if (user) {
            throw new BadRequestException("User with this login is already exists");
        }

        const hash = await bcrypt.hash(password, 10);

        await this.prismaService.user.create({
            data: {
                login,
                passwordHash: hash,
                profile: {
                    create: {
                        ...profile,
                        avatarUrl: avatarFileName
                    }
                }
            }
        });
    }

    async signIn(data: SignInDto): Promise<{ token: string }> {
        const { login, password } = data;

        const user = await this.prismaService.user.findUnique({
            where: { login }
        });

        if (!user) {
            throw new BadRequestException("Invalid login or password");
        }

        const isValidPass = await bcrypt.compare(password, user.passwordHash);
        if (!isValidPass) {
            throw new BadRequestException("Invalid login or password");
        } 

        const { passwordHash, ...payload } = user;
        const token = await this.jwtService.signAsync(payload);

        return { token };
    }
}
