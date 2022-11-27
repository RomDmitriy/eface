import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import IJwtTokens from '../interfaces/jwtTokens.interface'

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) { }

    // async validateUser(username: string, pass: string): Promise<any> {
    //     const user = await this.usersService.findOne(username);
    //     if (user && user.password === pass) {
    //         const { password, ...result } = user;
    //         return result;
    //     }
    //     return null;
    // }

    async getTokens(userID: number): Promise<IJwtTokens> {
        return {
            accessToken: this.jwtService.sign({userID: userID, type: 'Access'}, {secret: process.env.JWT_TOKEN,  expiresIn: 3600}),
            refreshToken: this.jwtService.sign({userID: userID, type: 'Access'}, {secret: process.env.JWT_TOKEN, expiresIn: 2592000})
        }
    }

    // async login(user: any) {
    //     const payload = { username: user.username, sub: user.userId };
    //     return {
    //         access_token: this.jwtService.sign(payload),
    //     };
    // }
}