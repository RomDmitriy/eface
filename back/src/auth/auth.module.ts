import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';
import { JwtService } from 'src/jwt/jwt.service';

@Module({
    controllers: [RegisterController, LoginController],
    providers:   [RegisterService, LoginService, PrismaService, JwtService],
})
export class AuthModule {}
