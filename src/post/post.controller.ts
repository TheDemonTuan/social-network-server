import { AuthGuard } from "@/auth/guards/auth.guard";
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { PostDto } from "./dtos/post.dto";
import { PostService } from "./post.service";
import { PostLikeDto } from "./dtos/post-like.dto";
import { UserInfo } from "@/common/decorators/user-info";
import { User } from "@prisma/client";

@UseGuards(AuthGuard)
@UsePipes(
  new ValidationPipe({
    transform: true,
    whitelist: true,
    stopAtFirstError: true,
  })
)
@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  public async getPosts(@UserInfo() userPayload: User) {
    return this.postService.getPosts(userPayload?.id);
  }

  @Post()
  public async createPost(@Body() body: PostDto, @UserInfo() userPayload: User) {
    return this.postService.createPost(body, userPayload?.id);
  }

  @Get("like/:postId")
  public async getLikePosts(@Param("postId", ParseIntPipe) postID: number) {
    return this.postService.getLikePosts(postID);
  }

  @Put("like/:postId")
  public async putLikePost(@Param("postId", ParseIntPipe) postID: number, @UserInfo() userInfo: User) {
    return this.postService.putLikePost(postID, userInfo?.id);
  }
}
