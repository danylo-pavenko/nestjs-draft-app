import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString} from "class-validator";

export class AddRoleDto {

    @ApiProperty({
        type: 'string',
        example: 'user@gmail.com',
        description: 'User email for registration'
    })
    @IsString({message: 'Email have to be a string type and not empty'})
    @IsEmail({}, {message: 'Please check email, it is invalid.'})
    readonly email: string;

    @ApiProperty({
        type: 'string',
        example: 'ADMIN',
        description: 'Name of role, what we want to provide for selected user'
    })
    readonly value: string;
}
