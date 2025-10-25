import { UserRole } from '@modules/user/entities/user.entity';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: IAuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET')!,
    });
  }

  async validate({ id }: { id: string; role: UserRole }) {
    const user = await this.authService.validateUserById(id);

    if (!user) {
      throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
    }

    return { id, role: user.role };
  }
}
