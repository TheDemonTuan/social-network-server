import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Request } from "express";
import { jwtConstants } from "../constants";
import { IUserPayload } from "@/common/decorators/user-payload.decorator";
import { DBUserService } from "@/database/user/user.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private readonly dbUserService: DBUserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token: string = request.cookies[jwtConstants?.name] || this.extractTokenFromHeader(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload: IUserPayload = await this.jwtService.verifyAsync(token, {
        secret: jwtConstants?.secret,
      });

      const thisUser = this.dbUserService.findUnique({ where: { id: payload?.id } });
      if (!thisUser) throw new UnauthorizedException("User not found");

      request["user_payload"] = payload;
      request["user_info"] = thisUser;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
