import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { BaseRepository } from '@core/prisma/base.repository';
import { Prisma } from 'generated/prisma';

@Injectable()
export class UserRepository extends BaseRepository<
  User,
  Prisma.UserCreateInput,
  Prisma.UserUpdateInput
> {
  get model() {
    return this.prisma.user;
  }

  async findById(id: string): Promise<User | null> {
    const user = await super.findById(id);
    if (!user) return null;
    return new User(
      user.id,
      user.email,
      user.name,
      user.role,
      user.isActive,
      user.createdAt,
      user.password,
    );
  }

  async findAll(): Promise<User[]> {
    const users = await super.findAll();
    return users.map(
      (user) =>
        new User(
          user.id,
          user.email,
          user.name,
          user.role,
          user.isActive,
          user.createdAt,
        ),
    );
  }
}
