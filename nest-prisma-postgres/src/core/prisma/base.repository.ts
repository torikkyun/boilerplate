import { PrismaService } from './prisma.service';

interface PrismaModel<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  findUnique(args: { where: { id: string }; select?: any }): Promise<T | null>;
  findMany(args?: {
    where?: any;
    select?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
  }): Promise<T[]>;
  create(args: { data: TCreate }): Promise<T>;
  update(args: { where: { id: string }; data: TUpdate }): Promise<T>;
  delete(args: { where: { id: string } }): Promise<T>;
  count(args?: { where?: any }): Promise<number>;
}

export abstract class BaseRepository<
  T,
  TCreate = Partial<T>,
  TUpdate = Partial<T>,
> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract get model(): PrismaModel<T, TCreate, TUpdate>;

  async findById(id: string, select?: object): Promise<T | null> {
    return this.model.findUnique({ where: { id }, select });
  }

  async findAll(args?: {
    where?: any;
    select?: any;
    orderBy?: any;
    skip?: number;
    take?: number;
  }): Promise<T[]> {
    return this.model.findMany(args);
  }

  async create(data: TCreate): Promise<T> {
    return this.model.create({ data });
  }

  async update(id: string, data: TUpdate): Promise<T> {
    return this.model.update({ where: { id }, data });
  }

  async delete(id: string): Promise<T> {
    return this.model.delete({ where: { id } });
  }

  async softDelete(id: string): Promise<T> {
    return this.model.update({
      where: { id },
      data: { isDeleted: true } as TUpdate,
    });
  }

  async count(where?: object): Promise<number> {
    return this.model.count({ where });
  }
}
