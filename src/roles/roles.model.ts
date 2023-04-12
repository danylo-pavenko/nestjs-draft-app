import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiModelProperty} from "@nestjs/swagger/dist/decorators/api-model-property.decorator";
import {User} from "../users/users.model";
import {UserRoles} from "./user-role.model";

interface RoleCreationAttr {
    value: string;
    description: string;
}

@Table({
    tableName: 'roles'
})
export class Role extends Model<Role, RoleCreationAttr> {

    @Column({
        type: DataType.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    })
    @ApiModelProperty({
        description: 'Incremented role unique ID',
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
        description: 'Some unique user role, like ADMIN',
        name: 'value',
        type: 'string',
        example: 'ADMIN'
    })
    value: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    @ApiModelProperty({
        description: 'Role description, like Administrator what can do in app',
        name: 'role',
        type: 'string',
        example: 'This role ADMIN, for change all stuff'
    })
    description: string;

    @BelongsToMany(() => User, () => UserRoles)
    users: User[]
}
