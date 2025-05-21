import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TestService {
  constructor(private prisma: PrismaService) {}

  async createTest(payload: any) {
    try {
      const testExists = await this.prisma.test.findFirst({
        where: {
          title: payload.title,
          categoryID: payload.categoryID,
        },
      });

      if (testExists) {
        throw new HttpException('Test already exists under this category', 422);
      }

      const newTest = await this.prisma.test.create({
        data: {
          title: payload.title,
          categoryID: payload.categoryID,
        },
      });

      return {
        message: 'success create test',
        status: 201,
        data: newTest,
      };
    } catch (e) {
      console.error(e);
      throw new HttpException('internal server error', 500);
    }
  }

  async getAllTests() {
    const tests = await this.prisma.test.findMany({
      include: {
        category: true,
        questions: true,
      },
    });

    return {
      message: 'success',
      status: 200,
      data: tests,
    };
  }

  async getTestDetail(id: string) {
    const test = await this.prisma.test.findFirst({
      where: {
        ID: id,
      },
      include: {
        category: true,
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!test) {
      throw new HttpException('Test not found', 404);
    }

    return {
      message: 'success get test detail',
      status: 200,
      data: test,
    };
  }

  async deleteTest(id: string) {
    const test = await this.prisma.test.findUnique({
      where: { ID: id },
    });

    if (!test) {
      throw new HttpException('Test not found', 404);
    }

    await this.prisma.test.delete({
      where: { ID: id },
    });

    return {
      message: 'success delete test',
      status: 200,
    };
  }

  async updateTest(id: string, payload: any) {
    const test = await this.prisma.test.findUnique({
      where: { ID: id },
    });

    if (!test) {
      throw new HttpException("Test doesn't exist", 422);
    }

    await this.prisma.test.update({
      where: { ID: id },
      data: {
        title: payload.title,
        categoryID: payload.categoryID,
      },
    });

    return {
      message: 'success update test',
      status: 200,
    };
  }
}
