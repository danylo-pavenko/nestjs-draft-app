import {Body, Controller, Post, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {FileInterceptor} from "@nestjs/platform-express";
import {Post as UserPost} from "../posts/posts.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";

@ApiTags('Posts')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {
    }

    @ApiOperation({summary: 'Create new post and save it with files'})
    @ApiResponse({status: 201, type: UserPost})
    @ApiConsumes('multipart/form-data')
    @ApiBody({
        description: 'Upload a image file',
        type: 'multipart/form-data',
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
                data: {
                    type: 'string'
                }
            }
        },
    })
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('User-auth-token')
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body('data') dto: CreatePostDto,
               @UploadedFile() image) {
        return this.postService.create(dto, image);
    }
}
