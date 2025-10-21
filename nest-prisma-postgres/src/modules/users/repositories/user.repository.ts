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

  findByEmail(email: string): Promise<Prisma.UserGetPayload<object> | null> {
    return this.model.findUnique({ where: { email } });
  }

  findByEmailWithPassword(
    email: string,
  ): Promise<Prisma.UserGetPayload<object> | null> {
    return this.model.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
        password: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
  }
}
