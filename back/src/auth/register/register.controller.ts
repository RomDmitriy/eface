import { Controller, Post, Body } from '@nestjs/common';
import { RegisterService } from './register.service';
import { UserAuth } from '../dto/userAuth.dto';
import { ApiResponse } from '@nestjs/swagger';

@Controller('register')
export class RegisterController {
    constructor(private readonly registerService: RegisterService) {}

    @Post()
    @ApiResponse({ status: 201, description: 'Пользователь успешно создан.'})
    @ApiResponse({ status: 403, description: 'Пользователь с таким Email уже существует.'})
    async createUser(@Body() newUserInfo: UserAuth): Promise<void> {
        return this.registerService.createUser(newUserInfo);
    }
}
