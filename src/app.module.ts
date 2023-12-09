import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PostModule } from "./post/post.module";

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, PostModule],
})
export class AppModule {}
