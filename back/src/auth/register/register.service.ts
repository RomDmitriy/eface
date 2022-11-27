import { ConflictException, Injectable } from '@nestjs/common';
import IJWTtokens from 'src/interfaces/jwtTokens.interface';
import { JwtService } from 'src/jwt/jwt.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserAuth } from '../dto/userAuth.dto';

@Injectable()
export class RegisterService {
    constructor(private readonly prismaService: PrismaService, private readonly jwtService: JwtService) { }

    async createUser(newUserInfo: UserAuth): Promise<IJWTtokens> {
        try {
            // добавляем пользователя в БД
            const newUser = await this.prismaService.user.create({
                data: newUserInfo,
                select: {id: true}
            });
            // генерируем токены для входа
            return this.jwtService.generateTokens(newUser.id);
        }
        catch (err) {
            // если Email уже занят
            console.log(err)
            throw new ConflictException();
        }
        
        return;
    }
}
