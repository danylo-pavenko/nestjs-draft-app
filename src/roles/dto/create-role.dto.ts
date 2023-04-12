import {ApiProperty} from "@nestjs/swagger";

export class CreateRoleDto {

    @ApiProperty({
        type: 'string',
        example: 'ADMIN',
        description: 'Role for control all stuff, administrator'
    })
    readonly value: string;

    @ApiProperty({
        type: 'string',
        example: 'Role for control all stuff, administrator',
        description: 'Long explain about role functionality'
    })
    readonly description: string;
}
