import { User } from '@modules/user/domain/user.entity';

export const USER_REPOSITORY = 'USER_REPOSITORY';

export interface UserRepositoryPort {
  findByEmail(email: string): Promise<User | null>;
  findById(id: string): Promise<User | null>;
  save(user: User): Promise<User>;
}
