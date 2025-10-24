import { Controller, Post, Body } from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { RegisterUserUseCase } from '../application/use-cases/register-user.usecase';
import { LoginUserUseCase } from '../application/use-cases/login-user.usecase';
import { ApiTags } from '@nestjs/swagger';
import { Public } from '@common/decorators/public.decorator';

@Controller('api/auth')
@Public()
@ApiTags('auth')
export class AuthController {
  constructor(
    private readonly registerUserUseCase: RegisterUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  @Post('register')
  async register(@Body() dto: RegisterUserDto): Promise<UserResponseDto> {
    const user = await this.registerUserUseCase.execute(dto);
    return {
      id: user.id,
      email: user.email.value,
      name: user.name,
      createdAt: user.createdAt,
      role: user.role,
      isActive: user.isActive,
    };
  }

  @Post('login')
  async login(@Body() dto: LoginUserDto): Promise<{ accessToken: string }> {
    return { accessToken: await this.loginUserUseCase.execute(dto) };
  }
}
