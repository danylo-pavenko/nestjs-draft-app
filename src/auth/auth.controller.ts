import {Body, Controller, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {AuthService} from "./auth.service";
import {User} from "../users/users.model";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {
    }

    @ApiOperation({summary: 'Login use with email and password'})
    @ApiResponse({status: 200, type: User})
    @ApiResponse({status: 400, description: 'Invalid credentials'})
    @Post('login')
    login(@Body() dto: CreateUserDto) {
        return this.authService.login(dto);
    }

    @ApiOperation({summary: 'Register new user with email and password'})
    @ApiResponse({status: 200, type: User})
    @Post('registration')
    registration(@Body() dto: CreateUserDto) {
        return this.authService.registration(dto);
    }
}
