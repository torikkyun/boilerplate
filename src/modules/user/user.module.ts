import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { PrismaModule } from "src/database/prisma.module";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  imports: [ConfigModule, PrismaModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
