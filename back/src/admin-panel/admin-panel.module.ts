import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminPanelController } from './admin-panel.controller';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AdminPanelController],
    providers:   [PrismaService, JwtAuthGuard]
})
export class AdminPanelModule {}
