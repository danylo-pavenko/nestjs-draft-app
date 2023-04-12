import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {RolesService} from "./roles.service";
import {CreateRoleDto} from "./dto/create-role.dto";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {Role} from "./roles.model";
import {Roles} from "../auth/role-auth.decorator";
import {RoleAuthGuard} from "../auth/role-auth.guard";

@ApiTags('Roles')
@Controller('roles')
export class RolesController {

    constructor(private roleService: RolesService) {
    }

    @ApiOperation({summary: 'Creation new role for user'})
    @ApiResponse({status: 200, type: Role})
    @Roles("ADMIN")
    @UseGuards(RoleAuthGuard)
    @Post()
    create(@Body() dto: CreateRoleDto) {
        return this.roleService.createRole(dto);
    }

    @ApiOperation({summary: 'Fetch user by value, like by type of role'})
    @ApiResponse({status: 200, type: Role})
    @Get(':value')
    getByValue(@Param('value') value: string) {
        return this.roleService.getRoleByValue(value);
    }

    @ApiOperation({summary: 'Fetch all roles'})
    @ApiResponse({status: 200, type: [Role]})
    @Get()
    getAll() {
        return this.roleService.getAllRoles();
    }
}
