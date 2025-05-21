import { CategoryTest } from './../../../node_modules/.prisma/client/index.d';
import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CategoryTestService {
  constructor(private p: PrismaService) {}

  async createCategoryTest(payload: any) {
    try {
      const category = await this.p.categoryTest.findFirst({
        where: {
          name: payload.name,
        },
      });

      if (category) {
        throw new HttpException('Category test already Exist', 422);
      } else {
        const newCategory = await this.p.categoryTest.create({
          data: payload,
        });

        return {
          message: 'success create category test',
          status: 201,
          data: newCategory,
        };
      }
    } catch (e) {
      if (e) {
        console.log(e);
        throw new HttpException('internal server error', 500);
      }
    }
  }

  async getAllCategoryTest() {
    const category = await this.p.categoryTest.findMany({
      include: {
        Test: true,
      },
    });
    return {
      message: 'success',
      status: 200,
      data: category,
    };
  }
}
