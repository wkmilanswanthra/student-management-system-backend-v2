import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { StudentsService } from './students.service';
import { StudentEntity } from '../common/entity/student.entity';

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  //Get all students
  @Get()
  async findAll(): Promise<StudentEntity[]> {
    return await this.studentsService.findAll();
  }

  //Get one student by id
  @Get(':id')
  async findOneById(@Param('id') id: number): Promise<StudentEntity> {
    return await this.studentsService.findOneById(id);
  }

  //Create a student
  @Post()
  async createStudent(@Body() student: StudentEntity): Promise<StudentEntity> {
    return await this.studentsService.createStudent(student);
  }

  //Update a student
  @Patch(':id')
  async updateStudent(
    @Param('id') id: number,
    @Body() student: StudentEntity,
  ): Promise<StudentEntity> {
    return await this.studentsService.updateStudent(id, student);
  }

  //Delete a student
  @Delete(':id')
  async deleteStudent(@Param('id') id: number): Promise<void> {
    return await this.studentsService.deleteStudent(id);
  }
}
