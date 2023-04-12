import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {

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
        example: '(password123456)',
        description: 'User password for registration, with limitation, min 6 length'
    })
    @IsString({message: 'Password have to be a string type and not empty'})
    @Length(6, 24, {message: 'Length of password have to be min 6 max a 24 chars'})
    readonly password: string;
}
