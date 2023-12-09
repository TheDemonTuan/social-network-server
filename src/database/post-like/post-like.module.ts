import { Module } from "@nestjs/common";
import { DBPostLikeService } from "./post-like.service";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DBPostLikeService],
  exports: [DBPostLikeService],
})
export class DBPostLikeModule {}