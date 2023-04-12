import {BelongsTo, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {User} from "../users/users.model";

interface PostCreationAttr {
    title: string;
    content: string;
    userId: number;
    image: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    @ApiModelProperty({
        description: 'Incremented post unique ID',
        name: 'id',
        type: 'integer',
        required: true,
        example: '1'
    })
    id: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    @ApiModelProperty({
        description: 'Title of post',
        name: 'title',
        type: 'string',
        example: 'New cool post'
    })
    title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    @ApiModelProperty({
        description: 'Post content, text type',
        name: 'content',
        type: 'string',
        example: 'Hello, it is my first post!'
    })
    content: string;

    @Column({type: DataType.STRING, allowNull: false})
    @ApiModelProperty({
        description: 'Post can contains an image',
        name: 'image',
        type: 'string',
        example: 'https://content.manager.com/images/image_1231dasd.jpg'
    })
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}
