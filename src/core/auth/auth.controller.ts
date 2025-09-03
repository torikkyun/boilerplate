import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from 'generated/prisma';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller('api/auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    registerAuthDto: RegisterAuthDto,
  ): Promise<{ message: string; email: string }> {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(
    loginAuthDto: LoginAuthDto,
  ): Promise<{ message: string; user: User; accessToken: string }> {
    return this.authService.login(loginAuthDto);
  }
}
