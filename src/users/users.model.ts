import {BelongsToMany, Column, DataType, HasMany, Model, Table} from "sequelize-typescript";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-role.model";
import {Post} from "../posts/posts.model";

interface UserCreationAttr {
    email: string;
    password: string;
}

@Table({tableName: 'users'})
export class User extends Model<User, UserCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    @ApiModelProperty({
        description: 'Incremented user unique ID',
        name: 'id',
        type: 'integer',
        required: true,
        example: '1'
    })
    id: number;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false
    })
    @ApiModelProperty({
        description: 'User email',
        name: 'email',
        type: 'string',
        example: 'user@gmail.com'
    })
    email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    @ApiModelProperty({
        description: 'User password',
        name: 'password',
        type: 'string',
        example: '(password123456)'
    })
    password: string;

    @Column({
        type: DataType.BOOLEAN,
        defaultValue: false
    })
    @ApiModelProperty({
        description: 'Status of user for use some content',
        name: 'banned',
        type: 'boolean',
        required: false,
        example: 'false'
    })
    banned: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    @ApiModelProperty({
        description: 'User banned by admin with reason info',
        name: 'banReason',
        type: 'string',
        required: false,
        example: 'It is good user, not need to ban'
    })
    banReason: string;

    @BelongsToMany(() => Role, () => UserRoles)
    roles: Role[]

    @HasMany(() => Post)
    posts: Post[]
}
