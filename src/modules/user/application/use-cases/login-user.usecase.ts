import {
  TokenServicePort,
  TOKEN_SERVICE,
} from '@modules/auth/application/ports/token.service.port';
import {
  UserRepositoryPort,
  USER_REPOSITORY,
} from '../ports/user.repository.port';
import { BadRequestException, Inject } from '@nestjs/common';

export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    @Inject(TOKEN_SERVICE)
    private readonly tokenService: TokenServicePort,
  ) {}

  async execute(props: { email: string; password: string }): Promise<string> {
    const user = await this.userRepository.findByEmail(props.email);
    if (!user) throw new BadRequestException('Email không hợp lệ');
    const isMatch = await user.password.compare(props.password);
    if (!isMatch) throw new BadRequestException('Mật khẩu không hợp lệ');

    return this.tokenService.generateAccessToken(user.id);
  }
}
