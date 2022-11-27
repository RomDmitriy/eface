import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserAuth } from '../dto/userAuth.dto';
import { ApiResponse } from '@nestjs/swagger';
import IJWTtokens from 'src/interfaces/jwtTokens.interface';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан.'})
    @ApiResponse({ status: 409, description: 'Пользователь с таким Email уже существует.'})
    async createUser(@Body() newUserInfo: UserAuth): Promise<IJWTtokens> {
        return this.registerService.createUser(newUserInfo);
    }
}
