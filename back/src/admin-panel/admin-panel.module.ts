import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { AdminPanelController } from './admin-panel.controller';

@Module({
    imports: [JwtModule.register({})],
    controllers: [AdminPanelController],
    providers:   [PrismaService]
})
export class AdminPanelModule {}
