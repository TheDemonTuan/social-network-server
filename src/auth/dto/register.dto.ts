import { IsEmail, IsInt, IsNotEmpty, IsNumberString, IsPhoneNumber, IsStrongPassword, Max, Min } from "class-validator";
import { IsVietnameseString } from "../../common/validation/is-vietnamese-string.validator";
import { Transform } from "class-transformer";

export class RegisterDto {
  @IsVietnameseString()
  @IsNotEmpty({ message: "First name is required" })
  readonly first_name: string;

  @IsVietnameseString()
  @IsNotEmpty({ message: "Last name is required" })
  readonly last_name: string;

  @IsEmail(undefined, { message: "Invalid email" })
  @IsNotEmpty({ message: "Email is required" })
  readonly email: string;

  @IsStrongPassword(undefined, { message: "Password is too weak" })
  @IsNotEmpty({ message: "Password is required" })
  readonly password: string;

  @IsPhoneNumber("VN", { message: "Invalid phone number" })
  @IsNotEmpty({ message: "Phone number is required" })
  readonly phone: string;

  @IsInt({ message: "Invalid birth day" })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Birth day is required" })
  readonly birth_day: number;

  @IsInt({ message: "Invalid birth month" })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Birth month is required" })
  readonly birth_month: number;

  @IsInt({ message: "Invalid birth year" })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Birth year is required" })
  readonly birth_year: number;

  @IsInt({ message: "Invalid gender" })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Gender is required" })
  readonly gender: number;
}
