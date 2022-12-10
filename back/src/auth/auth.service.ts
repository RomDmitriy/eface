import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserTokenInfoI } from 'src/interfaces/userTokenInfo.interface';
import IJwtTokens from '../interfaces/jwtToken.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async getTokens(user: UserTokenInfoI): Promise<IJwtTokens> {
        const id: number = user.user.id;
        return {
            access_token: this.jwtService.sign({user: {id: id}}, {secret: this.configService.get('JWT_TOKEN')})
        }
    }
}