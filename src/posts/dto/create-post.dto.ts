import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsNumber} from "class-validator";

export class CreatePostDto {

    @ApiProperty({
        type: 'string',
        example: 'My first post',
        description: 'Title for post'
    })
    @IsString({message: 'Title for post have to be a string'})
    readonly title: string;

    @ApiProperty({
        type: 'string',
        example: 'Content for my post, with multiline option',
        description: 'Text for post'
    })
    @IsString({message: 'Text/Content for post have to be a string'})
    readonly content: string;

    @ApiProperty({
        type: 'integer',
        example: '6',
        description: 'Here have to be number, id of user.'
    })
    @IsNumber({}, {message: 'UserId have to be integer'})
    readonly userId: number;
}
