import { ApiProperty } from "@nestjs/swagger";

export class UpdateEmote {
    @ApiProperty({
        description: 'Эмоция',
        default: 'Neutral'
    })
        emote: string;
}