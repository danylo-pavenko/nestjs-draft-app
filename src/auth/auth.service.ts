import {BadRequestException, Injectable, UnauthorizedException} from '@nestjs/common';
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UsersService} from "../users/users.service";
import {JwtService} from "@nestjs/jwt";
import * as bcrypt from "bcryptjs";
import {User} from "../users/users.model";

@Injectable()
export class AuthService {

    constructor(private userService: UsersService,
                private jwtService: JwtService) {
    }

    async login(dto: CreateUserDto) {
        const user = await this.validateUser(dto);
        return this.generateToken(user);
    }

    async registration(dto: CreateUserDto) {
        const existUser = await this.userService.getUserByEmail(dto.email);
        if (existUser) {
            throw new BadRequestException(`User with ${dto.email} does exist!`)
        }
        const hashPassword = await bcrypt.hash(dto.password, 8);
        const user = await this.userService.createUser({...dto, password: hashPassword});
        return this.generateToken(user);
    }

    private async generateToken(user: User) {
        const payload = { email: user.email, id: user.id, roles: user.roles }
        return { token: this.jwtService.sign(payload) }
    }

    private async validateUser(userDto: CreateUserDto) {
        const user = await this.userService.getUserByEmail(userDto.email);
        if (!user) throw new UnauthorizedException('Invalid credentials!')
        const passwordEquals = await bcrypt.compare(userDto.password, user.password);
        if (passwordEquals) {
            return user;
        } else {
            throw new UnauthorizedException('Invalid credentials!')
        }
    }
}
