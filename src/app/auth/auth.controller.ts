import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private as: AuthService) { }

  @Post('/register')
  async register(@Body() payload: any) {
    return await this.as.Register(payload);
  }

  @Post('/register/admin')
  async registerAdmin(@Body() payload: any) {
    return await this.as.registerAdmin(payload);
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

  @Patch("/users/status/:id")
  async bannedUser(@Param('id') id: string) {
    return await this.as.BannedUser(id);
  }
  @Patch("/users/status/active/:id")
  async ActiveUser(@Param('id') id: string) {
    return await this.as.ActiveUser(id);
  }

  @Delete("/users/delete/:id")
  async deleteUser(@Param('id') id: string) {
    return await this.as.deleteUser(id);
  }
}
