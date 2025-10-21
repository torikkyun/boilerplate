import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { Prisma } from 'generated/prisma';
import { IUserRepository } from './interfaces/user-repository.interface';
import { BaseRepository } from '@core/prisma/base.repository';
import { PrismaService } from '@core/prisma/prisma.service';

@Injectable()
export class UserRepository
  extends BaseRepository<User, Prisma.UserCreateInput, Prisma.UserUpdateInput>
  implements IUserRepository
{
  constructor(protected readonly prisma: PrismaService) {
    super(prisma);
  }

  get model() {
    return this.prisma.user;
  }

  async findMany(args: {
    where?: Prisma.UserWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Array<Omit<Prisma.UserGetPayload<object>, 'password'>>> {
    return this.model.findMany({
      where: args.where,
      skip: args.skip,
      take: args.take,
      orderBy: args.orderBy,
    });
  }

  async count(where?: Prisma.UserWhereInput): Promise<number> {
    return this.model.count({ where });
  }

  async findById(
    id: string,
  ): Promise<Omit<Prisma.UserGetPayload<object>, 'password'> | null> {
    return this.model.findUnique({
      where: { id },
    });
  }
}
