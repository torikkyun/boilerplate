import { Prisma } from 'generated/prisma';

export interface IUserRepository {
  findMany(args: {
    where?: Prisma.UserWhereInput;
    skip?: number;
    take?: number;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Array<Omit<Prisma.UserGetPayload<object>, 'password'>>>;

  count(where?: Prisma.UserWhereInput): Promise<number>;

  findById(
    id: string,
  ): Promise<Omit<Prisma.UserGetPayload<object>, 'password'> | null>;
}
