import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { getUsersController } from './get-users.controller';
import { DeleteUserController } from './delete-user.controller';

@Module({
    imports: [JwtModule.register({})],
    controllers: [getUsersController, DeleteUserController],
    providers:   [PrismaService, JwtAuthGuard]
})
export class AdminPanelModule {}
