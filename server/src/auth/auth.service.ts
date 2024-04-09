import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
import { SignUpDto } from './dto/sign.up.dto';

@Injectable()
export class AuthService {
    constructor(private prismaService: PrismaService) {}

    async signUp(data: SignUpDto) {
        const { login, password, ...profile } = data;

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
                    create: profile
                }
            }
        });
    }
}
