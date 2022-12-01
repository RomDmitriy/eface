import { Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { EmotionsController } from './emotions.controller';

@Module({
    providers: [PrismaService],
    controllers: [EmotionsController]
})
export class EmotionsModule { }
