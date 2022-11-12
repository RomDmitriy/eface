import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAuth } from '../dto/userAuth.dto';

@Injectable()
export class RegisterService {
    constructor(private readonly prismaService: PrismaService) { }

    async createUser(newUserInfo: UserAuth): Promise<void> {
        try {
            // добавляем пользователя в БД
            await this.prismaService.user.create({
                data: newUserInfo
            });
        }
        catch (err) {
            // если Email уже занят
            throw new ForbiddenException();
        }
        
        return;
    }
}
