import { IAuthService } from '@core/authentication/interfaces/auth-service.interface';
import { PrismaUserRepositoryImpl } from './prisma-user.repository.impl';
import { Role } from 'generated/prisma';
import { Inject } from '@nestjs/common';
import { USER_REPOSITORY } from '../application/ports/user.repository.port';

export class AuthRepositoryImpl implements IAuthService {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: PrismaUserRepositoryImpl,
  ) {}

  async validateUserById(
    id: string,
  ): Promise<{ id: string; role: Role } | null> {
    const user = await this.userRepository.findById(id);
    if (!user) return null;
    return { id: user.id, role: user.role };
  }
}
