import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class StudentService {
  constructor(private P: PrismaService) {}

  async getAllStudents() {
    const students = await this.P.student.findMany();
    return {
      message: 'success',
      status: 200,
      data: students,
    };
  }
}
