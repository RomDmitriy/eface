import { Body, Controller, HttpCode, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserAuth } from 'src/auth/dto/userAuth.dto';
import IJWTtokens from 'src/interfaces/jwtTokens.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('emotions')
export class EmotionsController {
    constructor(private readonly prismaService: PrismaService) {}

    @Put()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Эмоция обновлена'})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    @ApiTags('Auth')
    async updateEmote(@Body() userData: UserAuth): Promise<IJWTtokens> {
        return null;
    }
}
