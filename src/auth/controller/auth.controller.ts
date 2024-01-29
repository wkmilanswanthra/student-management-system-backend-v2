import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(
    @Body() authenticationRequest: { email: string; password: string },
  ) {
    try {
      return await this.authService.authenticateUser(authenticationRequest);
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  @Post('register')
  async register(@Body() registerRequest: { password: string; email: string }) {
    return await this.authService.registerUser(registerRequest);
  }

  @Post('logout')
  async logout(@Body() email: string) {
    return await this.authService.signOut(email);
  }
}
