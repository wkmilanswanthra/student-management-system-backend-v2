import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../../common/entity/student.entity';
import { StudentRepository } from '../../common/repository/student.repository';

interface searchResponse {
  data: StudentEntity[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

@Injectable()
export class StudentsService {
  constructor(
    // @InjectRepository(StudentEntity)
    private studentRepository: StudentRepository,
  ) {}

  async getTotalCount(): Promise<number> {
    return this.studentRepository.getTotalCount();
  }

  async findAll(page: number, limit: number): Promise<StudentEntity[]> {
    try {
      return await this.studentRepository.findAll(page, limit);
    } catch (err) {
      throw new Error('Failed to fetch students ' + err);
    }
  }

  async findOneById(id: number): Promise<StudentEntity> {
    try {
      return await this.studentRepository.findOneById(id);
    } catch (err) {
      throw new Error('Failed to fetch student with id: ' + id + ' ' + err);
    }
  }

  async search(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<searchResponse> {
    try {
      return await this.studentRepository.search(keyword, page, limit);
    } catch (err) {
      throw new Error('Failed to search students ' + err);
    }
  }

  async filterByDOB(
    range: object,
    page: number,
    limit: number,
  ): Promise<searchResponse> {
    try {
      return await this.studentRepository.filterByDOB(range, page, limit);
    } catch (err) {
      throw new Error('Failed to filter students ' + err);
    }
  }

  async createStudent(student: StudentEntity): Promise<StudentEntity> {
    try {
      return await this.studentRepository.createStudent(student);
    } catch (err) {
      throw new Error('Failed to create student ' + err);
    }
  }

  async updateStudent(
    id: number,
    student: StudentEntity,
  ): Promise<StudentEntity> {
    try {
      return await this.studentRepository.updateStudent(id, student);
    } catch (err) {
      throw new Error('Failed to update student with id: ' + id + ' ' + err);
    }
  }

  async deleteStudent(id: number): Promise<void> {
    try {
      await this.studentRepository.deleteStudent(id);
    } catch (err) {
      throw new Error('Failed to delete student with id: ' + id + ' ' + err);
    }
  }
}
