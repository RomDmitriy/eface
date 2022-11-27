import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { RegisterController } from './register/register.controller';
import { RegisterService } from './register/register.service';
import { LoginController } from './login/login.controller';
import { LoginService } from './login/login.service';

@Module({
    imports: [JwtModule.register({})],
    controllers: [RegisterController, LoginController],
    providers:   [RegisterService, LoginService, PrismaService],
})
export class AuthModule {}
