import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { StudentEntity } from '../../common/entity/student.entity';
import { StudentRepository } from '../../common/repository/student.repository';

@Injectable()
export class StudentsService {
  constructor(
    // @InjectRepository(StudentEntity)
    private studentRepository: StudentRepository,
  ) {}

  async findAll(): Promise<StudentEntity[]> {
    try {
      return await this.studentRepository.findAll();
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
