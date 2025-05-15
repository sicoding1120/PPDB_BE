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

  async createStudent(payload: Student) {
   
    try {
      const student = await this.P.student.findUnique({
        where: {
          NISN: payload.NISN,
          NIK: payload.NIK,
        },
      });

      if (student) {
        throw new HttpException('Student already exists', 400);
      }

      payload.dateOfBirth = new Date(payload.dateOfBirth).toISOString();

      await this.P.student.create({
        data: {
          NISN: payload.NISN,
          NIK: payload.NIK,
          fullName: payload.fullName,
          placeOfBirth: payload.placeOfBirth,
          dateOfBirth: payload.dateOfBirth,
          gender: payload.gender,
          address: payload.address,
          phone: payload.phone,
          major: payload.major,
          status: payload.status,
          orphanStatus: payload.orphanStatus,
         
          
        },
      } as never);

      return {
        message: 'success',
        status: 201,
        data: payload,
      };
    } catch (e) {
      if (e) {
        console.log(e);
        return {
          message: "terjadi kesalahan",
          status: 500,
          error: e
        }
      }
    }
  }
}
