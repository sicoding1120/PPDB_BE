import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtRefreshTokenStrategy } from './jwtRefreshToken.stratgy';
import { JwtAccessTokenStrategy } from './jwtAccessToken.strategy';

@Module({
  imports: [PrismaModule, JwtModule.register({})],
  providers: [AuthService, JwtAccessTokenStrategy, JwtRefreshTokenStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
