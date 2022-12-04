import { ApiProperty } from "@nestjs/swagger";

export class JWTtoken {
    @ApiProperty({
        description: 'Токен'
    })
        access_token: string;
}