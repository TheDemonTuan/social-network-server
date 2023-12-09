import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export const UserInfo = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request?.["user_info"] || null;
});
