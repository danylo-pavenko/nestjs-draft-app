import {ApiProperty} from "@nestjs/swagger";

export class BanUserDto {

    @ApiProperty({
        type: 'string',
        example: 'user@gmail.com',
        description: 'User email for registration'
    })
    readonly email: string;

    @ApiProperty({
        type: 'string',
        example: 'Do some bad things',
        description: 'Any test about reason of ban'
    })
    readonly banReason: string;
}
