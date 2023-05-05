import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common/exceptions';

export const GetUser = createParamDecorator(
  (data: string | string[], ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    const user = req.user;

    if (!user) {
      throw new InternalServerErrorException('User not found in the request');
    }

    if (typeof data === 'undefined') return user;

    if (typeof data === 'string') return { [data]: user[data] };

    const customUser = {};
    data.forEach((prop) => (customUser[prop] = user[prop]));

    return customUser;
  },
);
