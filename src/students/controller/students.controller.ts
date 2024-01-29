import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { StudentsService } from '../services/students.service';
import { StudentEntity } from '../../common/entity/student.entity';
import { min } from 'rxjs';
import { AuthGuard } from '@nestjs/passport';

interface PaginatedResponse {
  data: any;
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

@Controller('students')
export class StudentsController {
  constructor(private readonly studentsService: StudentsService) {}

  //Get all students
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findAll(
    @Query('keyword') keyword: string,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedResponse> {
    if (keyword) {
      return await this.studentsService.search(keyword, page, limit);
    } else {
      const data = await this.studentsService.findAll(page, limit);
      const total = await this.studentsService.getTotalCount();

      return {
        data,
        meta: {
          total,
          page,
          last_page: Math.ceil(total / limit),
        },
      };
    }
  }

  //Get one student by id
  @Get('/get/:id')
  @UseGuards(AuthGuard('jwt'))
  async findOneById(@Param('id') id: number): Promise<StudentEntity> {
    return await this.studentsService.findOneById(id);
  }

  @Post('/filter')
  @UseGuards(AuthGuard('jwt'))
  async filterByDOB(
    @Body() range: Date,
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ): Promise<PaginatedResponse> {
    return await this.studentsService.filterByDOB(range, page, limit);
  }

  //Create a student
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async createStudent(@Body() student: StudentEntity): Promise<StudentEntity> {
    return await this.studentsService.createStudent(student);
  }

  //Update a student
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateStudent(
    @Param('id') id: number,
    @Body() student: StudentEntity,
  ): Promise<StudentEntity> {
    return await this.studentsService.updateStudent(id, student);
  }

  //Delete a student
  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async deleteStudent(@Param('id') id: number): Promise<void> {
    return await this.studentsService.deleteStudent(id);
  }
}
