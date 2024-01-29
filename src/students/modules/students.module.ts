import { Module } from '@nestjs/common';
import { StudentsController } from '../controller/students.controller';
import { StudentsService } from '../services/students.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from '../../common/entity/student.entity';
import { StudentRepository } from '../../common/repository/student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity, StudentRepository])],
  controllers: [StudentsController],
  providers: [StudentsService, StudentRepository],
})
export class StudentsModule {}
