import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import IJWTtokens from 'src/interfaces/jwtTokens.interface';

@Injectable()
export class JwtService {
    generateTokens(userID: number): IJWTtokens {
        return {
            accessToken: jwt.sign({userID: userID, type: 'Access'}, process.env.JWT_TOKEN, {expiresIn: 3600}),
            refreshToken: jwt.sign({userID: userID, type: 'Access'}, process.env.JWT_TOKEN, {expiresIn: 2592000})
        };
    }

    //TODO: проверка токенов
}
