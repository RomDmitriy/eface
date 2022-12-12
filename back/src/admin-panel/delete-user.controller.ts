import { Controller, Delete, HttpCode, UseGuards, Body, NotFoundException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserID } from 'src/auth/dto/userID.dto';

@Controller('delete-user')
export class DeleteUserController {
    constructor(private readonly prismaService: PrismaService) {}

    @Delete()
    @HttpCode(200)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Пользователь удалён.'})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    @ApiTags('Admin-panel')
    async getUsersList(@Body() userData: UserID): Promise<void> {
        try {
            await this.prismaService.user.delete({
                where: {
                    id: userData.id
                }
            });
        }
        catch (err) {
            throw new NotFoundException();
        }
    }
}
