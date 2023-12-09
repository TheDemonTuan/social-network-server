import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";

export interface IUserPayload {
  id: string;
  iat: string;
  exp: string;
}

export const UserPayload = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest<Request>();
  return request?.["user_payload"] || null;
});
