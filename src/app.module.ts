import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StudentsModule } from './students/modules/students.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StudentEntity } from './common/entity/student.entity';
import { ConfigModule } from '@nestjs/config';
import { getEnvPath } from './common/config/env.helper';
import { AuthModule } from './auth/modules/auth.module';
import { AuthController } from './auth/controller/auth.controller';
import { AuthService } from './auth/services/auth.service';
import { AuthConfig } from './common/config/auth.config';

const envFilePath: string = getEnvPath(`./envfiles`);

console.log('dile path ' + envFilePath);

@Module({
  imports: [
    StudentsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.RDS_HOSTNAME || 'localhost',
      port: parseInt(process.env.RDS_PORT) || 5432,
      username: process.env.RDS_PASSWORD || 'postgres',
      password: process.env.RDS_USERNAME || 'root',
      database: process.env.RDS_DB_NAME || 'students',
      entities: [StudentEntity],
      synchronize: true,
    }),
    AuthModule,
  ],
  controllers: [AppController, AuthController],
  providers: [AppService, AuthService, AuthConfig],
})
export class AppModule {}
