import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { LoginController } from './login.controller';
import { AuthService } from './auth.service';
import { RegisterController } from './register.controller';

@Module({
    imports: [JwtModule.register({})],
    controllers: [LoginController, RegisterController],
    providers:   [PrismaService, AuthService],
})
export class AuthModule {}
