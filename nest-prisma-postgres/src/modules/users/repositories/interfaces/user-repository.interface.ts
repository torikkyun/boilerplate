import { Prisma } from 'generated/prisma';

export interface IUserRepository {
  findByEmail(email: string): Promise<Prisma.UserGetPayload<object> | null>;

  findByEmailWithPassword(
    email: string,
  ): Promise<Prisma.UserGetPayload<object> | null>;
}
