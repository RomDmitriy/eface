import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmotionsModule } from './emotions/emotions.module';
import { LoggerMiddleware } from './logger/logger.middleware';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { AdminPanelModule } from './admin-panel/admin-panel.module';

@Module({
    imports:     [AuthModule, EmotionsModule, ConfigModule.forRoot(), JwtModule.register({}), AdminPanelModule],
    controllers: [],
    providers:   [JwtStrategy],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}
