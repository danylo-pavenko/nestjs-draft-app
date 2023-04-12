import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {
    }

    async create(userId: number, dto: CreatePostDto, image: any) {
        let fileName = '';
        if (image) {
            fileName = await this.fileService.createFile(image);
        }
        const post = await this.postRepository.create({
            ...dto,
            userId: userId,
            image: fileName
        });
        return post;
    }

    async getAllPostsByUserId(userId: number) {
        return await this.postRepository.findAll({
            where: { userId },
            include: { all: true },
        })
    }
}
