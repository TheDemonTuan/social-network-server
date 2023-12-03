import { UserService } from "../database/user/user.service";
import { register } from "../../../client/.next/static/chunks/react-refresh";
import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dto/register.dto";
import { isBirthDay } from "../common/validation/is-birthday.validator";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dto/login.dto";

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  public async login(loginDto: LoginDto) {
    const userEmail = await this.userService.findUnique({
      where: {
        email: loginDto?.email,
      },
    });

    const userPhone = await this.userService.findUnique({
      where: {
        phone: loginDto?.email,
      },
    });

    const user = userEmail || userPhone;

    if (!user) throw new BadRequestException("Email hoặc phone không tồn tại.");

    if (!await bcrypt.compare(loginDto?.password, user?.password)) throw new BadRequestException("Mật khẩu không chính xác.");

    return user;
  }

  public async register(registerDto: RegisterDto) {
    // Validate birth date
    const birthDayValidator = isBirthDay(registerDto?.birth_day, registerDto?.birth_month, registerDto?.birth_year);
    if (birthDayValidator) throw new BadRequestException(birthDayValidator);

    // Validate gender
    if(registerDto?.gender < 0 || registerDto?.gender > 2) throw new BadRequestException("Giới tính không hợp lệ.");

    // Validate email
    const user = await this.userService.findUnique({
      where: {
        email: registerDto?.email,
      },
    });

    if (user) throw new BadRequestException("Email đã tồn tại.");

    // Validate phone
    const userPhone = await this.userService.findUnique({
      where: {
        phone: registerDto?.phone,
      },
    });

    if (userPhone) throw new BadRequestException("Số điện thoại đã tồn tại.");

    const hashPassword = await bcrypt.hash(registerDto?.password, await bcrypt.genSalt());
    const date = new Date(registerDto?.birth_year, registerDto?.birth_month - 1, registerDto?.birth_day);

    const newUser = await this.userService.insert({
      first_name: registerDto?.first_name,
      last_name: registerDto?.last_name,
      email: registerDto?.email,
      password: hashPassword,
      phone: registerDto?.phone,
      date_of_birth: date,
      gender: registerDto?.gender,
    });

    return newUser;
  }
}
