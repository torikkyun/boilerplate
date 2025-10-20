import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { UserRepository } from '../repositories/user.repository';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from '../dto/login-user.dto';
import { User } from 'generated/prisma';
import { AuthenticationService } from '@core/authentication/authentication.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly authenticationService: AuthenticationService,
  ) {}

  async register({
    email,
    password,
    name,
    age,
  }: RegisterUserDto): Promise<{ message: string; email: string }> {
    const user = await this.userRepository.model.findUnique({
      where: { email },
      select: { id: true },
    });

    if (user) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.userRepository.model.create({
      data: {
        email,
        password: hashedPassword,
        name,
        Profile: {
          create: { age },
        },
      },
    });

    return {
      message: 'Đăng ký tài khoản thành công',
      email,
    };
  }

  async login({ email, password }: LoginUserDto): Promise<{
    message: string;
    user: Omit<User, 'password'>;
    accessToken: string;
  }> {
    const user = await this.userRepository.model.findUnique({
      where: { email },
    });

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password: _password, ...userData } = user;
      const accessToken =
        await this.authenticationService.generateAccessToken(user);
      return { message: 'Đăng nhập thành công', user: userData, accessToken };
    }

    throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
  }
}
