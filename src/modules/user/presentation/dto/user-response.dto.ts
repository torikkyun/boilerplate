import { UserRole } from '@modules/user/domain/user.entity';

export class UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}
