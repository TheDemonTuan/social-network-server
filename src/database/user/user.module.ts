import { Global, Module } from "@nestjs/common";
import { PrismaModule } from "src/prisma/prisma.module";
import { DBUserService } from "./user.service";

@Global()
@Module({
  imports: [PrismaModule],
  providers: [DBUserService],
  exports: [DBUserService],
})
export class DBUserModule {}
