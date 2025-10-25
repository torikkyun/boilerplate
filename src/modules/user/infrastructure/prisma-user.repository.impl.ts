import { Injectable } from '@nestjs/common';
import { PrismaService } from '@core/database/prisma/prisma.service';
import { UserRepositoryPort } from '../application/ports/user.repository.port';
import { User } from '../domain/user.entity';
import { UserRole } from '@common/enums/user-role.enum';

@Injectable()
export class PrismaUserRepositoryImpl implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
        role: true,
        isActive: true,
        createdAt: true,
      },
    });
    if (!userData) return null;
    return User.reconstitute({
      id: userData.id,
      email: userData.email,
      passwordHash: userData.password,
      name: userData.name,
      role: userData.role as UserRole,
      isActive: userData.isActive,
      createdAt: userData.createdAt,
    });
  }

  async findById(id: string): Promise<User | null> {
    const userData = await this.prisma.user.findUnique({ where: { id } });
    if (!userData) return null;
    return User.create({
      id: userData.id,
      email: userData.email,
      password: userData.password,
      name: userData.name,
      role: userData.role as UserRole,
      isActive: userData.isActive,
      createdAt: userData.createdAt,
    });
  }

  async save(user: User): Promise<User> {
    const saved = await this.prisma.user.upsert({
      where: { id: user.id },
      update: {
        email: user.email.value,
        password: user.password.value,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
      },
      create: {
        id: user.id,
        email: user.email.value,
        password: user.password.value,
        name: user.name,
        role: user.role,
        isActive: user.isActive,
        createdAt: user.createdAt,
      },
    });
    return User.reconstitute({
      id: saved.id,
      email: saved.email,
      passwordHash: saved.password,
      name: saved.name,
      role: saved.role as UserRole,
      isActive: saved.isActive,
      createdAt: saved.createdAt,
    });
  }
}
