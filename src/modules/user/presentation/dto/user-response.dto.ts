import { UserRole } from '@common/enums/user-role.enum';

export class UserResponseDto {
  id: string;
  email: string;
  name: string | null;
  role: UserRole;
  isActive: boolean;
  createdAt: Date;
}
