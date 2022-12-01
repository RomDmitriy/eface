import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserTokenInfoI } from 'src/interfaces/userTokenInfo.interface';
import IJwtTokens from '../interfaces/jwtTokens.interface'

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) { }

    async getTokens(user: UserTokenInfoI): Promise<IJwtTokens> {
        return {
            accessToken: this.jwtService.sign({user, type: 'Access'}, {secret: this.configService.get('JWT_TOKEN'), expiresIn: 3600}),
            refreshToken: this.jwtService.sign({user, type: 'Refresh'}, {secret: this.configService.get('JWT_TOKEN'), expiresIn: 2592000})
        }
    }
}