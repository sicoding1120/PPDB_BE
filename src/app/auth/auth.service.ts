import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { $Enums } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { jwt_config } from 'src/config/jwt.config';
import { PrismaService } from 'src/prisma/prisma.service';

interface jwtPayload {
  ID: string;
  username: string;
  role: $Enums.Role; // sesuaikan dengan enum di Prisma kamu
  email: string;
  phone: string;
}

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

  async registerAdmin(payload: any) {
    try {
      const user = await this.p.user.findFirst({
        where: {
          email: payload.email,
          phone: payload.phone,
        },
      })
      if (user) {
        throw new HttpException('user already exist', 400);
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
    } catch (error) {
      if (error) {
        throw new HttpException('internal server error', 500);
      }
    }
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
        throw new HttpException('user already exist', 400);
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
      console.log(e);
      throw new HttpException('internal server error', 500);
    }
  }

  async Login(payload: any) {
    let user: any;
    if (payload.email !== "" && payload.phone == "") {
      user = await this.p.user.findFirst({
        where: {
          email: payload.email,
        },
      });
    } else if (payload.email == "" && payload.phone !== "") {
      user = await this.p.user.findFirst({
        where: {
          phone: payload.phone,
        },
      });
    }

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
      await this.p.user.update({
        where: {
          ID: user.ID,
        },
        data: {
          refreshToken: refresh_token,
        },
      });
      return {
        message: 'success login',
        status: 200,
        data: {
          ID: user.ID,
          username: user.username,
          password: user.password,
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

  async LoginAdmin(payload: any) {
    let user: any;

    if (payload.email !== "" || payload.phone == "") {
      user = await this.p.user.findFirst({
        where: {
          email: payload.email,
        },
      });
    } else if (payload.email == "" || payload.phone !== "") {
      user = await this.p.user.findFirst({
        where: {
          phone: payload.phone,
        },
      });
    }

    if (!user) {
      throw new HttpException("user doesn't exist", 422);
    }

    if (user.role !== 'ADMIN') {
      throw new HttpException("you are not authorized as admin", 403);
    }

    const checkPassword = await compare(payload.password, user.password);
    if (!checkPassword) {
      throw new HttpException("email and password doesn't match", 422);
    }

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

    await this.p.user.update({
      where: { ID: user.ID },
      data: { refreshToken: refresh_token },
    });

    return {
      message: 'success login as admin',
      status: 200,
      data: {
        ID: user.ID,
        username: user.username,
        email: user.email,
        phone: user.phone,
        role: user.role,
        access_token,
        refresh_token,
      },
    };
  }

  async getAllUser() {
    const users = await this.p.user.findMany();
    return {
      message: 'success get all user',
      status: 200,
      data: users,
    };
  }
}
