import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/registerUser.dto';
import { VerifyUserDto } from './dto/verifyUser.dto';
import { LoginUserDto } from './dto/loginUser.dto';
import { ExceptionFilter } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }
  @Post('verify')
  async verifyUser(@Body() verifyUserDto: VerifyUserDto) {
    return this.authService.verifyUser(verifyUserDto);
  }
  @Post('login')
  @UseFilters()
  async login(@Body() loginUserDto: LoginUserDto) {
    try {
      return this.authService.authenticateUser(loginUserDto);
    } catch (e) {
      throw e
    }
  }
}
