import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentTestDto, UpdateStudentTestDto } from './student-test.dto';

@Injectable()
export class StudentTestsService {
  constructor(private prisma: PrismaService) {}

  async createStudentTest(dto: CreateStudentTestDto) {
    const result = await this.prisma.studentTest.create({
      data: {
        studentID: dto.studentID,
        testID: dto.testID,
      },
    });

    return {
      message: 'Student test started',
      data: result,
    };
  }

  async finishStudentTest(id: string, dto: UpdateStudentTestDto) {
    const existing = await this.prisma.studentTest.findUnique({
      where: { ID: id },
    });
    if (!existing) throw new NotFoundException('StudentTest not found');

    const updated = await this.prisma.studentTest.update({
      where: { ID: id },
      data: {
        finishedAt: dto.finishedAt,
        score: dto.score,
      },
    });

    return {
      message: 'Student test finished',
      data: updated,
    };
  }

  async getAllStudentTests() {
    const result = await this.prisma.studentTest.findMany({
      include: {
        student: true,
        test: true,
        studentAnswers: true,
      },
    });

    return {
      message: 'All student tests',
      data: result,
    };
  }

  async getStudentTestById(id: string) {
    const result = await this.prisma.studentTest.findUnique({
      where: { ID: id },
      include: {
        student: true,
        test: true,
        studentAnswers: true,
      },
    });

    if (!result) throw new NotFoundException('Student test not found');

    return {
      message: 'Student test detail',
      data: result,
    };
  }

  async deleteStudentTest(id: string) {
    const result = await this.prisma.studentTest.delete({
      where: { ID: id },
    });

    return {
      message: 'Student test deleted',
      data: result,
    };
  }

  async checkStudentTestStatus(studentID: string, testID: string) {
    const test = await this.prisma.studentTest.findFirst({
      where: {
        studentID,
        testID,
      },
    });

    return {
      hasStarted: !!test,
      data: test,
    };
  }
}
