import { Repository, DataSource } from 'typeorm';
import { StudentEntity } from '../entity/student.entity';
import { Injectable } from '@nestjs/common';

interface searchResponse {
  data: StudentEntity[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

@Injectable()
export class StudentRepository extends Repository<StudentEntity> {
  constructor(private dataSource: DataSource) {
    super(StudentEntity, dataSource.createEntityManager());
  }

  async getTotalCount(): Promise<number> {
    return this.count();
  }

  public async findAll(page: number, limit: number): Promise<StudentEntity[]> {
    return await this.find({
      skip: limit * (page - 1),
      take: limit,
      order: { id: 'ASC' },
    });
  }

  public async findOneById(id: number): Promise<StudentEntity> {
    return await this.findOne({ where: { id } });
  }

  public async search(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<searchResponse> {
    const response = await this.createQueryBuilder()
      .select()
      .where('"firstName" LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('"lastName" LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('"email" LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('"phone" LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .orWhere('"address" LIKE :keyword', {
        keyword: `%${keyword}%`,
      })
      .skip(limit * (page - 1))
      .take(limit)
      .orderBy('id', 'ASC')
      .getManyAndCount();

    return {
      data: response[0],
      meta: {
        total: response[1],
        page,
        last_page: Math.ceil(response[1] / limit),
      },
    };
  }

  public async filterByDOB(
    min: Date,
    max: Date,
    page: number,
    limit: number,
  ): Promise<searchResponse> {
    min = new Date(min);
    max = new Date(max);
    const response = await this.createQueryBuilder()
      .select()
      .where('"dateOfBirth" BETWEEN :min AND :max', {
        min,
        max,
      })
      .skip(limit * (page - 1))
      .take(limit)
      .orderBy('id', 'ASC')
      .getManyAndCount();

    return {
      data: response[0],
      meta: {
        total: response[1],
        page: page,
        last_page: Math.ceil(response[1] / limit),
      },
    };
  }

  public async createStudent(student: StudentEntity): Promise<StudentEntity> {
    return await this.save(student);
  }

  public async updateStudent(
    id: number,
    student: StudentEntity,
  ): Promise<StudentEntity> {
    await this.update(id, student);
    return await this.findOneById(id);
  }

  public async deleteStudent(id: number): Promise<void> {
    await this.delete(id);
  }
}
