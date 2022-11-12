import { NotFoundException, Injectable } from '@nestjs/common';
import { UserAuth } from 'src/auth/dto/userAuth.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class LoginService {
    constructor(private readonly prismaService: PrismaService) { }

    async authenticateUser(userData: UserAuth): Promise<void> {
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
