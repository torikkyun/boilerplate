import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenServicePort } from '../application/ports/token.service.port';

interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtTokenServiceImpl implements TokenServicePort {
  constructor(private readonly jwtService: JwtService) {}

  async generateAccessToken(userId: string): Promise<string> {
    const payload: JwtPayload = { id: userId };
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<{ id: string } | null> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      return { id: payload.id };
    } catch {
      return null;
    }
  }
}
