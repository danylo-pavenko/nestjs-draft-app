import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRoleDto} from "./dto/create-role.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Role} from "./roles.model";

@Injectable()
export class RolesService {

    constructor(@InjectModel(Role) private roleRepository: typeof Role) {
    }

    async createRole(dto: CreateRoleDto) {
        const existedRole = await this.roleRepository.findOne({
            where: { value: dto.value }
        })
        if (existedRole != null) {
            throw new BadRequestException(`Role like ${dto.value} is exist!`)
        }
        const role = await this.roleRepository.create(dto);
        return role;
    }

    async getRoleByValue(value: string) {
        const role = await this.roleRepository.findOne({
            where: { value: value },
            include: { all: true }
        })
        if (role == null) {
            throw new NotFoundException(`Role '${value}' doesn't exist!`)
        }
        return role
    }

    async getAllRoles() {
        return await this.roleRepository.findAll();
    }
}
