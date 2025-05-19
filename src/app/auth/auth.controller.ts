import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private as: AuthService) { }
    
    @Post("/register")
    async register(@Body() payload:any) {
        return await this.as.Register(payload);
    }

    @Post("/login")
    async Login(@Body() payload:any) {
        return await this.as.Login(payload);
    }
}
