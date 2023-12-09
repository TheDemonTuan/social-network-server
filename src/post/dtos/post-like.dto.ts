import { Transform } from "class-transformer";
import { IsInt, IsNotEmpty } from "class-validator";

export class PostLikeDto {
  @IsInt({ message: "Post ID must be a number" })
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty({ message: "Post ID is required" })
  post_id: number;
}
