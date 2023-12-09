import { DBUserService } from "../database/user/user.service";
import { BadRequestException, Injectable } from "@nestjs/common";
import { RegisterDto } from "./dtos/register.dto";
import * as bcrypt from "bcrypt";
import { LoginDto } from "./dtos/login.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService {
  constructor(private readonly userService: DBUserService, private readonly jwtService: JwtService) {}

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

    if (!user) throw new BadRequestException("Email or phone not found");

    if (!(await bcrypt.compare(loginDto?.password, user?.password)))
      throw new BadRequestException("Your password is incorrect");

    const token = await this.jwtService.signAsync({ id: user?.id });

    return {
      token,
      user,
    };
  }

  public async register(registerDto: RegisterDto) {
    //Validate birth of day
    if (registerDto?.dob > new Date()) throw new BadRequestException("Date of birth not valid.");

    // Validate gender
    if (registerDto?.gender < 0 || registerDto?.gender > 2) throw new BadRequestException("Gender not valid.");

    // Validate email
    const user = await this.userService.findUnique({
      where: {
        email: registerDto?.email,
      },
    });

    if (user) throw new BadRequestException("Email is already exists.");

    // Validate phone
    const userPhone = await this.userService.findUnique({
      where: {
        phone: registerDto?.phone,
      },
    });

    if (userPhone) throw new BadRequestException("Phone is already exists.");

    const hashPassword = await bcrypt.hash(registerDto?.password, await bcrypt.genSalt());

    const newUser = await this.userService.insert({
      first_name: registerDto?.first_name,
      last_name: registerDto?.last_name,
      email: registerDto?.email,
      password: hashPassword,
      phone: registerDto?.phone,
      date_of_birth: registerDto?.dob,
      gender: registerDto?.gender,
    });

    return newUser;
  }

  public async me(id: string) {
    const user = await this.userService.findUnique({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException("User not found");

    return user;
  }
}
