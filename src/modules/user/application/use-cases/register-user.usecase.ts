import { User } from '@modules/user/domain/user.entity';
import {
  UserRepositoryPort,
  USER_REPOSITORY,
} from '../ports/user.repository.port';
import { BadRequestException, Inject } from '@nestjs/common';

export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
  ) {}

  async execute(props: {
    email: string;
    password: string;
    name?: string;
  }): Promise<User> {
    const existed = await this.userRepository.findByEmail(props.email);
    if (existed) {
      throw new BadRequestException('Email đã được sử dụng');
    }
    const user = await User.create({
      id: crypto.randomUUID(),
      email: props.email,
      password: props.password,
      name: props.name,
    });
    return this.userRepository.save(user);
  }
}
