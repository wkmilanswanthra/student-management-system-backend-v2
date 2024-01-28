import { Repository } from 'typeorm';
import { StudentEntity } from '../entity/student.entity';

export default class StudentRepository extends Repository<StudentEntity> {
  public async findAll(): Promise<StudentEntity[]> {
    return await this.find();
  }

  public async findOneById(id: number): Promise<StudentEntity> {
    return await this.findOne({ where: { id } });
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
