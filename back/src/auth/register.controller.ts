import { Controller, Post, Body, ConflictException } from '@nestjs/common';
import { UserAuth } from './dto/userAuth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import IJWTtokens from 'src/interfaces/jwtTokens.interface';
import { AuthService } from './auth.service';

@Controller('register')
export class RegisterController {
    constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан.'})
    @ApiResponse({ status: 409, description: 'Пользователь с таким Email уже существует.'})
    @ApiTags('Auth')
    async createUser(@Body() newUserInfo: UserAuth): Promise<IJWTtokens> {
        try {
            // добавляем пользователя в БД
            const newUser = await this.prismaService.user.create({
                data: newUserInfo,
                select: {id: true}
            });
            // генерируем токены для входа
            return this.authService.getTokens({id: newUser.id});
            //return null;
        }
        catch (err) {
            // если Email уже занят
            throw new ConflictException();
        }
    }
}
