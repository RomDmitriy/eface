import { Controller, Post, Body, HttpCode, HttpStatus, NotFoundException } from '@nestjs/common';
import { UserAuth } from './dto/userAuth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import IJWTtoken from 'src/interfaces/jwtToken.interface';
import { AuthService } from './auth.service';
import { JWTtoken } from './dto/jwtToken.dto';

@Controller('login')
export class LoginController {
    constructor(private readonly prismaService: PrismaService, private readonly authService: AuthService) {}

    @Post()
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: 200, description: 'Пользователь аутентифицирован.', type: JWTtoken})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    @ApiTags('Auth')
    async authenticateUser(@Body() userData: UserAuth): Promise<IJWTtoken> {
        // ищем пользователя с такими данными
        // код кринжа, ибо дизайнеру сказали, что у админа должен быть доступ к просмотру почт и паролей в явном виде. Я знаю, что пароли надо хэшировать, но таково ТЗ.
        const user = await this.prismaService.user.findFirst({
            where: {
                email: userData.email,
                password: userData.password
            },
            select: {
                id: true
            }
        });

        // если пользователь не найден
        if (user === null) {
            throw new NotFoundException();
        }

        // если пользователь найден, то генерируем и возвращаем токены
        return this.authService.getTokens({ user : user });
    }
}
