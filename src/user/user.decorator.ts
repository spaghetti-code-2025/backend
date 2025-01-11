import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetJwtUser = createParamDecorator(
  (_data, ctx: ExecutionContext): { address: string } => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  },
);
