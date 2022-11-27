import { Controller, HttpCode, Post, Body } from '@nestjs/common';
import { UserAuth } from 'src/auth/dto/userAuth.dto';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
    constructor(private readonly loginService: LoginService) {}

    @Post()
    @HttpCode(200)
    async authenticateUser(@Body() userAuth: UserAuth): Promise<void> {
        return this.loginService.authenticateUser(userAuth);
    }
}
