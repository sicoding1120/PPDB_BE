import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateStudentDto } from './student.dto';
import { format, subDays } from 'date-fns';

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

  async getStudentById(id: string) {
    const student = await this.P.student.findUnique({
      where: {
        ID: id,
      },
      include: {
        father: true,
        mother: true,
        document: true,
      },
    });

    if (!student) {
      throw new HttpException('Student not found', 404);
    }
    return {
      message: 'success',
      status: 200,
      data: student,
    };
  }

  async studentOverview() {
    const today = new Date();
    const last5Days = subDays(today, 4);
    const studentDateIn = await this.P.student.findMany({
      where: {
        createdAt: {
          gte: new Date(format(last5Days, 'yyy-MM-dd')),
        },
      },
    });
    const counts: Record<string, number> = {};

    for (const s of studentDateIn) {
      const dateKey = format(s.createdAt, 'yyyy-MM-dd');
      counts[dateKey] = (counts[dateKey] || 0) + 1;
    }

    // Pastikan urutan tanggal tetap (termasuk hari yang tidak ada data)
    const history: { tgl: string; jml_siswa: number }[] = [];
    for (let i = 4; i >= 0; i--) {
      const date = subDays(today, i);
      const dateStr = format(date, 'yyyy-MM-dd');
      history.push({
        tgl: dateStr,
        jml_siswa: counts[dateStr] || 0,
      });
    }
    const studentCount = await this.P.student.count();

    const JSPS = await this.P.student.groupBy({
      by: ['from_school'],
      _count: { from_school: true },
      orderBy: {
        _count: {
          from_school: 'desc',
        },
      },
      take: 5,
      where: {
        from_school: {
          not: '', // hindari sekolah kosong
        },
      },
    });
    let jsps: any;
    jsps = JSPS.map((item) => ({
      schoolName: item.from_school,
      studentCount: item._count.from_school,
    }));
    const JSPM = await this.P.student.groupBy({
      by: ['major'],
      _count: { major: true },
      orderBy: {
        _count: { major: 'desc' },
      },
    });

    let jspm: any;
    jspm = JSPM.map((item) => ({
      major: item.major,
      studentCount: item._count.major,
    }));
    const JSPOS = await this.P.student.groupBy({
      by: ['orphanStatus'],
      _count: { orphanStatus: true },
      orderBy: {
        _count: { orphanStatus: 'desc' },
      },
    });

    let jspos: any;
    jspos = JSPOS.map((item) => ({
      orphanStatus: item.orphanStatus,
      studentCount: item._count.orphanStatus,
    }));

    return {
      message: 'success',
      status: 200,
      data: {
        studentCount: studentCount,
        studentSuccess: 0,
        studentFailed: 0,
        studentOut: 0,
        history: history,
        JSPS: jsps,
        JSPM: jspm,
        JSPOS: jspos,
      },
    };
  }

  async createStudent(payload: CreateStudentDto) {
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
          ...payload,
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
          message: 'terjadi kesalahan',
          status: 500,
          error: e,
        };
      }
    }
  }

  async getParents() {
    const parents = await this.P.student.findMany({
      select: {
        father: {
          select: {
            name: true,
            job: true,
          },
        },
        mother: {
          select: {
            name: true,
            job: true,
          },
        },
        fullName: true,
        from_school: true,
        ID: true,
      },
    });

    return {
      message: 'success',
      status: 200,
      data: parents,
    };
  }

  async getParentByStudentId(id: string) {
    const parent = await this.P.student.findUnique({
      where: {
        ID: id,
      },
      select: {
        father: {
          select: {
            name: true,
            job: true,
            ID: true,
            phone: true,
            address: true,
            status: true,
            citizenship: true,
          },
        },
        mother: {
          select: {
            name: true,
            job: true,
            ID: true,
            phone: true,
            address: true,
            status: true,
            citizenship: true,
          },
        },
        fullName: true,
        from_school: true,
        ID: true,
      },
    });
    return {
      message: 'success',
      status: 200,
      data: parent,
    };
  }

  async deleteStudentById(id: string) {
    const student = await this.P.student.findUnique({
      where: {
        ID: id,
      },
    });

    if (!student) {
      throw new HttpException('Student not found', 404);
    }

    await this.P.student.delete({
      where: {
        ID: id,
      },
    });

    return {
      message: 'success',
      status: 200,
      data: student,
    };
  }
}
