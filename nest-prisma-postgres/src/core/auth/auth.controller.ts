import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { RegisterAuthDto } from './dto/register-auth.dto';
import { User } from 'generated/prisma';
import { LoginAuthDto } from './dto/login-auth.dto';
import { Public } from '@common/decorators/public.decorator';

@Controller('api/auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() registerAuthDto: RegisterAuthDto,
  ): Promise<{ message: string; email: string }> {
    return this.authService.register(registerAuthDto);
  }

  @Post('login')
  login(@Body() loginAuthDto: LoginAuthDto): Promise<{
    message: string;
    user: Omit<User, 'password'>;
    accessToken: string;
  }> {
    return this.authService.login(loginAuthDto);
  }
}
