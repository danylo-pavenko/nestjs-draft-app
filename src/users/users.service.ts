import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "./users.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";
import {UserRoles} from "../roles/user-role.model";
import {Role} from "../roles/roles.model";
import {AddRoleDto} from "../roles/dto/add-role.dto";
import {BanUserDto} from "./dto/ban-user.dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User,
                private roleService: RolesService) {
    }

    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        const role = await this.roleService.getRoleByValue('USER')
        await user.$set('roles', [role.id]);
        user.roles = [role];
        return user;
    }

    async getAllUsers() {
        const users = await this.userRepository.findAll({
            include: {
                all: true
                /**
                 * For choose only needs fields, just define next line
                 * attributes: ['id', 'value']
                 */
            }
        });
        return users;
    }

    async getUserByEmail(email: string) {
        const existUser = await this.userRepository.findOne({
            where: { email },
            include: { all: true }
        });
        return existUser;
    }

    async addRole(dto: AddRoleDto) {
        const user = await this.getUserByEmail(dto.email);
        if (!user) {
            throw new BadRequestException(`User doesn't exist by ${dto.email}!`);
        }
        const role = await this.roleService.getRoleByValue(dto.value);
        if (!role) {
            throw new BadRequestException('Are you request unknown role!');
        }
        if (user.roles.map(role => role.value).includes(role.value)) {
            throw new BadRequestException('User has this role.');
        }
        await user.$add("roles", role.id);
        user.roles.push(role);
        return user;
    }

    async banUser(dto: BanUserDto) {
        const user = await this.getUserByEmail(dto.email);
        if (!user) {
            throw new BadRequestException(`User doesn't exist by ${dto.email}!`);
        }
        if (user.banned) {
            throw new BadRequestException(`User ${dto.email} already banned!`);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();

        return user;
    }
}
