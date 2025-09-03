import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@core/prisma/prisma.service';
import { RegisterAuthDto } from './dto/register-auth.dto';
import * as bcrypt from 'bcrypt';
import { LoginAuthDto } from './dto/login-auth.dto';
import { User } from 'generated/prisma';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register({
    email,
    password,
    ...registerAuthDto
  }: RegisterAuthDto): Promise<{ message: string; email: string }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user) {
      throw new ConflictException('Email đã được đăng ký');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await this.prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        ...registerAuthDto,
      },
    });

    return {
      message: 'Đăng ký tài khoản thành công',
      email,
    };
  }

  async login({ email, password }: LoginAuthDto): Promise<{
    message: string;
    user: User;
    accessToken: string;
  }> {
    const user = await this.prisma.user.findUnique({ where: { email } });

    if (user && (await bcrypt.compare(password, user.password))) {
      const accessToken = this.jwtService.sign({ id: user.id });
      return { message: 'Đăng nhập thành công', user, accessToken };
    }

    throw new UnauthorizedException('Email hoặc mật khẩu không đúng');
  }
}
