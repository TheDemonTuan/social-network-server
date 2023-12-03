import { IsEmail, IsNotEmpty, IsStrongPassword } from "class-validator";

export class LoginDto {

  @IsNotEmpty({ message: "Email or phone is required" })
  email: string;

  @IsStrongPassword(undefined, { message: "Password is too weak" })
  @IsNotEmpty({ message: "Password is required" })
  password: string;
}