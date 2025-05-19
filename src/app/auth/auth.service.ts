import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare, hash } from 'bcrypt';
import { jwt_config } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private p: PrismaService,
    private jwtService: JwtService,
  ) {}

  generateJWT(payload: jwtPayload, expiresIn: string | number, token: string) {
    return this.jwtService.sign(payload, {
      secret: token,
      expiresIn: expiresIn,
    });
  }

  async Register(payload: any) {
    try {
      const user = await this.p.user.findUnique({
        where: {
          email: payload.email,
          phone: payload.phone,
        },
      });
      if (user) {
        throw new HttpException('user Alredy Exist', 400);
      }
      payload.password = await hash(payload.password, 12);
      await this.p.user.create({
        data: payload,
      });

      return {
        message: 'success register your account',
        status: 201,
        data: payload,
      };
    } catch (e) {
      if (e) {
        console.log(e);
        throw new HttpException('internal server error', 500);
      }
    }
  }

  async Login(payload: any) {
    const user = await this.p.user.findUnique({
      where: {
        email: payload.email,
        phone: payload.phone,
      },
    });

    if (!user) {
      throw new HttpException("user doesn't exist", 422);
    }

    const checkPassword = await compare(payload.password, user.password);
    if (checkPassword) {
      const jwtPayload: jwtPayload = {
        ID: user.ID,
        username: user.username,
        role: user.role,
        email: user.email,
        phone: user.phone,
        };
        const access_token = await this.generateJWT(
          jwtPayload,
          '1d',
          jwt_config.access_token_secret,
        );
        const refresh_token = await this.generateJWT(
          jwtPayload,
          '7d',
          jwt_config.refresh_token_secret,
        );
      return {
        message: 'success login',
        status: 200,
        data: {
          id: user.ID,
          email: user.email,
          phone: user.phone,
          role: user.role,
          access_token,
          refresh_token,
        },
      };
    } else {
      throw new HttpException("email and password doesn't match", 422);
    }
  }
}
