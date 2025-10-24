import { AuthenticationService } from '@core/authentication/authentication.service';
import {
  UserRepositoryPort,
  USER_REPOSITORY,
} from '../ports/user.repository.port';
import { BadRequestException, Inject } from '@nestjs/common';

export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepositoryPort,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async execute(props: { email: string; password: string }): Promise<string> {
    const user = await this.userRepository.findByEmail(props.email);
    if (!user) throw new BadRequestException('Email không hợp lệ');
    const isMatch = await user.password.compare(props.password);
    if (!isMatch) throw new BadRequestException('Mật khẩu không hợp lệ');

    return this.authenticationService.generateAccessToken(user.id);
  }
}
