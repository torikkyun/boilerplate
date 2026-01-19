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
import { UpdateUserDto } from "./dto/update-user.dto";
import {
  avatarStorage,
  avatarFileFilter,
  AVATAR_MAX_FILE_SIZE,
} from "src/common/utils/file-upload.util";

@Controller("api/users")
@ApiTags("users")
@ApiBearerAuth()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get("profile")
  async getProfile(@CurrentUser() { id }: User) {
    return this.userService.getProfile(id);
  }

  @Patch("profile")
  @UseInterceptors(
    FileInterceptor("avatar", {
      storage: avatarStorage,
      fileFilter: avatarFileFilter,
      limits: { fileSize: AVATAR_MAX_FILE_SIZE },
    }),
  )
  @ApiConsumes("multipart/form-data", "application/json")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
          description: "Tên người dùng",
        },
        password: {
          type: "string",
          description: "Mật khẩu mới (tối thiểu 8 ký tự)",
          minLength: 8,
        },
        avatar: {
          type: "string",
          format: "binary",
          description: "File ảnh avatar (JPG, PNG, GIF, WEBP - Max 5MB)",
        },
      },
    },
  })
  async updateProfile(
    @CurrentUser() { id }: User,
    @Body() dto: UpdateUserDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.userService.updateProfile(id, dto, file);
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

  @Patch(":uuid")
  @Roles("admin")
  async updateById(
    @Param("uuid", new ParseUUIDPipe()) uuid: string,
    @Body() dto: UpdateUserDto,
  ) {
    return await this.userService.updateById(uuid, dto);
  }
}
