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
        return {
            token: this.jwtService.sign({user}, {secret: this.configService.get('JWT_TOKEN')})
        }
    }
}