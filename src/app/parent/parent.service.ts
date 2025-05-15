import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ParentService {
  constructor(private p: PrismaService) {}

  async getAllParents() {
    const parents = await this.p.parent.findMany();
    return {
      message: 'success',
      status: 200,
      data: parents,
    };
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
}
