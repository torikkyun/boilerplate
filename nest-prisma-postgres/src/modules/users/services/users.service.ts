import { PrismaService } from '@core/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Prisma } from 'generated/prisma';
import { PaginatedResponseDto } from '@common/dtos/pagination.dto';
import { SearchUserDto } from '../dto/search-user.dto';
import { UserRepository } from '../repositories/user.repository';

@Injectable()
export class UsersService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll({
    email,
    page,
    limit,
    skip,
  }: SearchUserDto): Promise<
    PaginatedResponseDto<Omit<Prisma.UserGetPayload<object>, 'password'>>
  > {
    const where: Prisma.UserWhereInput = {
      ...(email && { email: { contains: email, mode: 'insensitive' } }),
    };

    const [users, total] = await Promise.all([
      this.userRepository.model.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        omit: { password: true },
      }),
      this.userRepository.model.count({ where }),
    ]);

    const result: PaginatedResponseDto<
      Omit<Prisma.UserGetPayload<object>, 'password'>
    > = {
      message: 'Lấy danh sách người dùng thành công',
      data: users,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };

    return result;
  }

  async findById(id: string) {
    return this.userRepository.model.findUnique({ where: { id } });
  }
}
