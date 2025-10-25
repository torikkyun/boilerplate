export const TOKEN_SERVICE = 'TOKEN_SERVICE';

export interface TokenServicePort {
  generateAccessToken(userId: string): Promise<string>;
  verifyToken(token: string): Promise<{ id: string } | null>;
}
