import { Module } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controller/auth.controller';
import { AuthConfig } from 'src/common/config/auth.config';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from 'src/common/middleware/jwt.strategy';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthService, AuthConfig, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
