import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtService } from './jwt/jwt.service';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports:     [AuthModule, ConfigModule.forRoot()],
    controllers: [AppController],
    providers:   [AppService, JwtService],
})
export class AppModule {}
