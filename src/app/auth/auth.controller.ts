import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private as: AuthService) { }

  @Post('/register')
  async register(@Body() payload: any) {
    return await this.as.Register(payload);
  }

  @Post('/login')
  async Login(@Body() payload: any) {
    return await this.as.Login(payload);
  }

  @Post('admin/login')
  async loginAdmin(@Body() payload: any) {
    return this.as.LoginAdmin(payload);
  }

  @Get('/users')
  async getUSers() {
    return await this.as.getAllUser();
  }
}
