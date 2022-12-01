import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IJwtTokens from '../interfaces/jwtTokens.interface'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    async getTokens(userID: number): Promise<IJwtTokens> {
        return {
            accessToken: this.jwtService.sign({userID: userID, type: 'Access'}, {secret: process.env.JWT_TOKEN,  expiresIn: 3600}),
            refreshToken: this.jwtService.sign({userID: userID, type: 'Access'}, {secret: process.env.JWT_TOKEN, expiresIn: 2592000})
        }
    }
}