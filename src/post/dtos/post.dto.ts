import { IsNotEmpty, IsString } from "class-validator";

export class PostDto {
  @IsString({
    message: "Content must be a string",
  })
  @IsNotEmpty({
    message: "Content is required",
  })
  readonly content: string;
}
