import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Query,
  Patch,
  Body,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiBearerAuth, ApiTags, ApiConsumes, ApiBody } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { QueryUserDto } from "./dto/query-user.dto";
import { UserService } from "./user.service";
import { CurrentUser } from "src/common/decorators/current-user.decorator";
import { User } from "generated/prisma/client";

@Controller("api/users")
@ApiTags("users")
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  async getProfile(@CurrentUser() { id }: User) {
    return this.userService.getProfile(id);
  }

  @Get()
  @Roles("admin")
  async findAll(@Query() query: QueryUserDto) {
    return await this.userService.findAll(query);
  }

  @Get(":uuid")
  @Roles("admin")
  async findById(@Param("uuid", new ParseUUIDPipe()) uuid: string) {
    return await this.userService.findById(uuid);
  }
}
