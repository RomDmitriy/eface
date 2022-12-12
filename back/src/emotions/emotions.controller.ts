import { Body, Controller, HttpCode, HttpStatus, Put, Request, UseGuards, BadRequestException } from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Emote } from '@prisma/client';
import { UpdateEmote } from 'src/auth/dto/updateEmote.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { UserTokenInfoI } from 'src/interfaces/userTokenInfo.interface';
import { PrismaService } from 'src/prisma/prisma.service';

@Controller('emotion')
export class EmotionsController {
    constructor(private readonly prismaService: PrismaService) { }

    @Put()
    @HttpCode(HttpStatus.OK)
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiResponse({ status: 200, description: 'Эмоция обновлена' })
    @ApiResponse({ status: 404, description: 'Плохой запрос' })
    @ApiTags('Emotes')
    async updateEmote(@Body() req: UpdateEmote, @Request() jwtInfo: UserTokenInfoI): Promise<void> {
        if (Emote[req.emote] === undefined ||
            jwtInfo === undefined ||
            jwtInfo.user.id === undefined)
            throw new BadRequestException();

        await this.prismaService.user.update({
            where: {
                id: jwtInfo.user.id
            },
            data: {
                emotion: Emote[req.emote]
            }
        });
    }
}
