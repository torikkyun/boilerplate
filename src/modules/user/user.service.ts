import { Injectable } from "@nestjs/common";
import { Prisma, User } from "generated/prisma/client";
import { PrismaService } from "src/database/prisma.service";
import { QueryUserDto } from "./dto/query-user.dto";

@Injectable()
export class UserService {
  private readonly prisma: PrismaService;
  constructor(prisma: PrismaService) {
    this.prisma = prisma;
  }

  async findAll({ page = 1, limit = 10, search }: QueryUserDto): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const take = limit;
    const skip = (page - 1) * limit;

    const where: Prisma.UserWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: "insensitive" } },
            { email: { contains: search, mode: "insensitive" } },
          ],
        }
      : {};

    const [users, total] = await Promise.all([
      this.prisma.user.findMany({
        include: { role: true },
        where,
        skip,
        take,
        orderBy: { createdAt: "desc" },
      }),
      this.prisma.user.count({ where }),
    ]);

    return {
      users,
      total,
      page,
      limit,
    };
  }
}
