import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const validRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    const user: User = context.switchToHttp().getRequest().user;

    if (!validRoles) return true;

    if (validRoles.length === 0) return true;

    if (!user)
      throw new UnauthorizedException(
        'Token is invalid, there is not user in the request',
      );

    for (const role of user.roles) {
      if (validRoles.includes(role)) return true;
    }

    throw new ForbiddenException(
      `Insuficient privileges, user require roles: ${validRoles}`,
    );
  }
}
