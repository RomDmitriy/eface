import { ApiProperty } from "@nestjs/swagger";

export class UserID {
    @ApiProperty({
        description: 'ID'
    })
        id: number;
}