import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateFatherDto } from './father.dto';
import { CreateMotherDto } from './mother.dto';

@Injectable()
export class ParentService {
  constructor(private p: PrismaService) {}

  //   async getAllMother() {
  //     const parents = await this.p;
  //     return {
  //       message: 'success',
  //       status: 200,
  //       data: parents,
  //     };
  //   }

  async getAllFather() {
    const father = await this.p.father.findMany();
    return {
      message: 'success',
      status: 200,
      data: father,
    };
  }

  async getAllMother() {
    const mother = await this.p.mother.findMany();
    return {
      message: 'success',
      status: 200,
      data: mother,
    };
  }

  async getParent(payload: ParentDTO) {
    const parent = await this.p.student.findUnique({
      where: {
        ID: payload.studentID,
      },
      select: {
        mother: true,
        father: true
      }
    });

    return {
      message: "success",
      status: 200,
      data: parent
    }
  }

  async createParent(payload: any) {
    try {
      return {
        message: 'success',
        status: 201,
        data: payload,
      };
    } catch (e) {
      if (e) {
        console.log(e);
        return {
          message: 'terjadi kesalahan',
          status: 500,
          data: e,
        };
      }
    }
  }

  async createFather(payload: CreateFatherDto | any) {
    try {
      const father = await this.p.father.create({
        data: payload,
      } as never);
      return {
        message: 'success',
        status: 201,
        data: father,
      };
    } catch (e) {
      if (e) {
        console.log(e);
        return {
          message: 'terjadi kesalahan',
          status: 500,
          data: e,
        };
      }
    }
  }

  async createMother(payload: CreateMotherDto | any) {
    try {
      const mother = await this.p.mother.create({
        data: payload,
      });
      return {
        message: 'success',
        status: 201,
        data: mother,
      };
    } catch (e) {
      if (e) {
        console.log(e);
        return {
          message: 'terjadi kesalahan',
          status: 500,
          data: e,
        };
      }
    }
  }
}
