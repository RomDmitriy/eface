import { Controller, Get, HttpCode, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { userInfoForAdminI } from 'src/interfaces/userInfoForAdmin.interface';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserInfoForAdmin } from 'src/auth/dto/userInfoForAdmin.dto';

@Controller('admin-panel')
export class getUsersController {
    constructor(private readonly prismaService: PrismaService) {}

    @Get()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Возврат списка.', type: UserInfoForAdmin, isArray: true})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    @ApiTags('Admin-panel')
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
