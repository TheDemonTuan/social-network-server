import { Body, Controller, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { AuthService } from "./auth.service";
import { LoginDto } from "./dto/login.dto";

@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError: true,
  })
)
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return await this.authService.login(loginDto);
  }
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return await this.authService.register(registerDto);
  }
}
