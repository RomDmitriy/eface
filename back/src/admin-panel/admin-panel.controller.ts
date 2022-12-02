import { Controller, Get, HttpCode, UseGuards, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtService } from '@nestjs/jwt';
import { AdminGuard } from 'src/auth/guards/admin.guard';

@Controller('admin-panel')
export class AdminPanelController {
    constructor(private readonly jwtService: JwtService) {}

    @Get()
    @HttpCode(200)
    @UseGuards(AdminGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Эмоция обновлена'})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    @ApiTags('Auth')
    async updateEmote(@Request() req): Promise<void> {
        return req.user;
    }
}
