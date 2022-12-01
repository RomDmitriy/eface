import { Controller, Post, Body, HttpCode, NotFoundException } from '@nestjs/common';
import { UserAuth } from './dto/userAuth.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('login')
export class LoginController {
    constructor(private readonly prismaService: PrismaService) {}

    @Post()
    @HttpCode(200)
    @ApiResponse({ status: 200, description: 'Пользователь аутентифицирован.'})
    @ApiResponse({ status: 404, description: 'Пользователь не найден.'})
    async authenticateUser(@Body() userData: UserAuth): Promise<void> {
        // ищем пользователя с такими данными
        // код кринжа, ибо дизайнеру сказали, что у админа должен быть доступ к просмотру почт и паролей в явном виде. Я знаю, что пароли надо хэшировать, но таково ТЗ.
        const user = await this.prismaService.user.findFirst({
            where: {
                email: userData.email,
                password: userData.password
            }
        });

        // если пользователь не найден
        if (user === null) {
            throw new NotFoundException();
        }
    }
}
