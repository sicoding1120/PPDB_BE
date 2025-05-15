import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

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

  async getParent(payload:any) {
    const mother = await this.p.mother.findUnique({
      where: {
        studentID: payload.studentID,
      }
    })

    const father = await this.p.father.findUnique({
      where: {
        studentID: payload.studentID,
      }
    })
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

  async createFather(payload: any) {
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

  async createMother(payload: any) {
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
}
