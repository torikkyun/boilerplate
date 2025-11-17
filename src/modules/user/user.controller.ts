import { Controller, Get, Param, ParseUUIDPipe, Query } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { Roles } from "src/common/decorators/roles.decorator";
import { QueryUserDto } from "./dto/query-user.dto";
import { UserEntity } from "./entities/user.entity";
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
    const result = await this.userService.findAll(query);
    return {
      ...result,
      users: result.users.map((user) => new UserEntity(user)),
    };
  }

  @Get(":uuid")
  @Roles("admin")
  async findById(@Param("uuid", new ParseUUIDPipe()) uuid: string) {
    const user = await this.userService.findById(uuid);
    return new UserEntity(user);
  }
}
