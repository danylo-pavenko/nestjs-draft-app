import {Body, Controller, Get, Header, Post, UseGuards, UsePipes} from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user.dto";
import {UsersService} from "./users.service";
import {ApiBearerAuth, ApiHeader, ApiHeaders, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.model";
import {RoleAuthGuard} from "../auth/role-auth.guard";
import {Roles} from "../auth/role-auth.decorator";
import {AddRoleDto} from "../roles/dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {ValidationPipe} from "../pipes/validation.pipe";

@ApiTags('Users')
@Controller('users')
export class UsersController {

    constructor(private userService: UsersService) {
    }

    @ApiOperation({summary: 'Creation new user by email and password'})
    @ApiResponse({status: 200, type: User})
    @UsePipes(ValidationPipe)
    @Post()
    create(@Body() userDto: CreateUserDto) {
        return this.userService.createUser(userDto);
    }

    @ApiOperation({summary: 'Fetch all users'})
    @ApiResponse({status: 200, type: [User]})
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('User-auth-token')
    @Get()
    getAll() {
        return this.userService.getAllUsers();
    }

    @ApiOperation({summary: 'Add role for user'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RoleAuthGuard)
    @ApiBearerAuth('User-auth-token')
    @Post('role')
    addRole(@Body() dto: AddRoleDto) {
        return this.userService.addRole(dto);
    }

    @ApiOperation({summary: 'Ban user with reason description'})
    @ApiResponse({status: 200})
    @Roles("ADMIN")
    @UseGuards(RoleAuthGuard)
    @ApiBearerAuth('User-auth-token')
    @Post('ban')
    banUser(@Body() dto: BanUserDto) {
        return this.userService.banUser(dto);
    }
}
