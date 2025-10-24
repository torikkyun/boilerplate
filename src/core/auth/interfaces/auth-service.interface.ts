import { Role } from 'generated/prisma';

export const AUTH_SERVICE = 'IAuthService';

export interface IAuthService {
  validateUserById(id: string): Promise<{ id: string; role: Role } | null>;
}
