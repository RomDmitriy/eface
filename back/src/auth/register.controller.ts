import { Controller, Post, Body, HttpCode, HttpStatus, ConflictException } from '@nestjs/common';
import { UserAuth } from './dto/userAuth.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { PrismaService } from 'src/prisma/prisma.service';
import IJWTtoken from 'src/interfaces/jwtToken.interface';
import { AuthService } from './auth.service';
import { JWTtoken } from './dto/jwtToken.dto';

@Controller('register')
export class RegisterController {
    constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан.', type: JWTtoken})
    @ApiResponse({ status: 409, description: 'Пользователь с таким Email уже существует.'})
    @ApiTags('Auth')
    async createUser(@Body() newUserInfo: UserAuth): Promise<IJWTtoken> {
        try {
            // добавляем пользователя в БД
            const user = await this.prismaService.user.create({
                data: newUserInfo,
                select: {id: true}
            });
            // генерируем токены для входа
            return this.authService.getTokens({ user : user });
            //return null;
        }
        catch (err) {
            // если Email уже занят
            throw new ConflictException();
        }
    }
}
