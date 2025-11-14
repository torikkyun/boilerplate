import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { QueryUserDto } from "./dto/query-user.dto";
import { User } from "./entities/user.entity";

const MAX_LIMIT = 100;

@Injectable()
export class UserService {
  private readonly userRepository: Repository<User>;
  constructor(
    @InjectRepository(User)
    userRepository: Repository<User>
  ) {
    this.userRepository = userRepository;
  }

  async findAll({ page, limit, search }: QueryUserDto): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const pageNum = Math.max(1, Number(page) || 1);
    const take = Math.min(Math.max(1, Number(limit) || 10), MAX_LIMIT);
    const skip = (pageNum - 1) * take;
    const query = this.userRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.role", "role")
      .select(["user.id", "user.email", "role.name"])
      .orderBy("user.id", "DESC")
      .skip(skip)
      .take(take);
    if (search) {
      query.andWhere("(user.email ILIKE :search)", { search: `%${search}%` });
    }
    const [users, total] = await query.getManyAndCount();
    return { users, total, page: pageNum, limit: take };
  }
}
