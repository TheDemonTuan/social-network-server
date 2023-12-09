import { Module } from "@nestjs/common";
import { DBPostService } from "./post.service";
import { PrismaModule } from "@/prisma/prisma.module";

@Module({
  imports: [PrismaModule],
  providers: [DBPostService],
  exports: [DBPostService],
})
export class DBPostModule {}