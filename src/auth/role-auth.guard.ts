import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {User} from "../users/users.model";
import {Reflector} from "@nestjs/core";
import {ROLE_KEY} from "./role-auth.decorator";

@Injectable()
export class RoleAuthGuard implements CanActivate {

    constructor(private jwtService: JwtService,
                private reflector: Reflector) {
    }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        try {
            const requiredRoles: string[] = this.reflector.getAllAndOverride(ROLE_KEY, [
                context.getHandler(),
                context.getClass()
            ]);
            if (!requiredRoles) {
                return true;
            }
            const req = context.switchToHttp().getRequest();

            const authHeader = req.headers.authorization;
            const bearer = authHeader.split(' ')[0];
            const token = authHeader.split(' ')[1];

            if (bearer !== 'Bearer' || !token) {
                throw new UnauthorizedException('Invalid authorization token')
            }

            const user: User = this.jwtService.verify(token);
            req.user = user;
            if (user.banned) {
                throw new ForbiddenException('You are banned user, call an admin!');
            }
            return user.roles.some(role => requiredRoles.includes(role.value));
        } catch (e) {
            throw new ForbiddenException(`Access is restricted!`);
        }
    }
}
