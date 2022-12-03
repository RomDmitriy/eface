import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { userInfoForAdminI } from 'src/interfaces/userInfoForAdmin.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('admin-panel')
export class AdminPanelController {
    constructor(private readonly jwtService: JwtService, private readonly prismaService: PrismaService) {}

    @Get()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Эмоция обновлена'})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    @ApiTags('Auth')
    async getUsersList(): Promise<userInfoForAdminI[]> {
        const users = await this.prismaService.user.findMany({
            select: {
                id: true,
                email: true,
                password: true
            }
        });

        return users;
    }
}
