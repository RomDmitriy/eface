import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { EmotionsModule } from './emotions/emotions.module';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
    imports:     [AuthModule, EmotionsModule, ConfigModule.forRoot()],
    controllers: [],
    providers:   [],
})
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/');
    }
}
