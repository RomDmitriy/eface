import { ApiProperty } from "@nestjs/swagger";

export class UserAuth {
    @ApiProperty({
        description: 'Электронная почта пользователя',
        default: 'ivashkin@mail.ru'
    })
        email: string;

    @ApiProperty({
        description: 'Пароль пользователя',
        default: '12345678',
        minimum: 8,
        maximum: 64
    })
        password: string;
}