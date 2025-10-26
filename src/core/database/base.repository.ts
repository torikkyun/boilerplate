import { Repository, FindOptionsWhere, DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseEntity } from './base.entity';

export abstract class BaseRepository<T extends BaseEntity> {
  constructor(protected readonly repository: Repository<T>) {}

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async findAll(
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<T[]> {
    return await this.repository.findBy(options || {});
  }

  async findById(id: string, relations: string[] = []): Promise<T | null> {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations,
    });
  }

  async update(id: string, data: QueryDeepPartialEntity<T>): Promise<T | null> {
    await this.repository.update(id, data);
    return await this.findById(id);
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.repository.delete(id);
    return result.affected !== 0;
  }

  async softDelete(id: string): Promise<boolean> {
    const result = await this.repository.softDelete(id);
    return result.affected !== 0;
  }

  async restore(id: string): Promise<boolean> {
    const result = await this.repository.restore(id);
    return result.affected !== 0;
  }

  async exists(id: string): Promise<boolean> {
    const count = await this.repository.count({
      where: { id } as FindOptionsWhere<T>,
    });
    return count > 0;
  }

  async count(options?: FindOptionsWhere<T>): Promise<number> {
    return await this.repository.countBy(options || {});
  }

  async findOne(
    where: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    relations: string[] = [],
  ): Promise<T | null> {
    return await this.repository.findOne({
      where,
      relations,
    });
  }

  async paginate(
    page: number = 1,
    limit: number = 10,
    options?: FindOptionsWhere<T> | FindOptionsWhere<T>[],
  ): Promise<{ data: T[]; total: number; page: number; limit: number }> {
    const [data, total] = await this.repository.findAndCount({
      where: options,
      skip: (page - 1) * limit,
      take: limit,
    });
    return { data, total, page, limit };
  }
}
