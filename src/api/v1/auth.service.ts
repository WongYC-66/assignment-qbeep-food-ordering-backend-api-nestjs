
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService
    ) { }

    async signIn(username: string, pass: string): Promise<any> {
        if (!username || !pass) {
            throw new UnauthorizedException();
        }

        const user = await this.prisma.user.findUnique({
            where: { username }
        });

        if (user?.password !== pass) {
            throw new UnauthorizedException();
        }

        const { password, ...rest } = user

        const payload = {
            ...rest,
            sub: user.id,
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}
