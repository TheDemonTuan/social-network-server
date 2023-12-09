import { Module } from "@nestjs/common";
import { PostController } from "./post.controller";
import { PostService } from "./post.service";
import { DBPostModule } from "@/database/post/post.module";
import { DBUserModule } from "@/database/user/user.module";
import { DBPostLikeModule } from "@/database/post-like/post-like.module";

@Module({
  imports: [DBPostModule, DBUserModule, DBPostLikeModule],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
