import { Controller, Get, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { QueryUserDto } from "./dto/query-user.dto";
import { UserService } from "./user.service";

@Controller("api/users")
@ApiTags("users")
@ApiBearerAuth()
export class UserController {
  private readonly userService: UserService;
  constructor(userService: UserService) {
    this.userService = userService;
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
