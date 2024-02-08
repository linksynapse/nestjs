import { CanActivate, ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './roles.enum';
import { ROLES_KEY } from './roles.decorator';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new Logger(RoleGuard.name);
  private usersService = new UsersService();

  constructor(private reflector: Reflector, ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if(!requiredRoles) {
      return true;
    }
    
    const { USER } = context.switchToHttp().getRequest();
    const { roles } = await this.usersService.findOne({ user_id: USER.properties.user_id });

    this.logger.debug(`${USER.properties.user_id} is Roles ${roles}`);

    return requiredRoles.some((role) => roles?.includes(role));
  }
}
