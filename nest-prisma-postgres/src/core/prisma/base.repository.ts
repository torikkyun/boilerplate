import { PrismaService } from './prisma.service';

interface PrismaModel<T, TCreate = Partial<T>, TUpdate = Partial<T>> {
  findUnique(args: { where: { id: string } }): Promise<T | null>;
  findMany(): Promise<T[]>;
  create(args: { data: TCreate }): Promise<T>;
  update(args: { where: { id: string }; data: TUpdate }): Promise<T>;
  delete(args: { where: { id: string } }): Promise<T>;
}

export abstract class BaseRepository<
  T,
  TCreate = Partial<T>,
  TUpdate = Partial<T>,
> {
  constructor(protected readonly prisma: PrismaService) {}

  abstract get model(): PrismaModel<T, TCreate, TUpdate>;

  async findById(id: string): Promise<T | null> {
    return this.model.findUnique({ where: { id } });
  }

  async findAll(): Promise<T[]> {
    return this.model.findMany();
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
}
