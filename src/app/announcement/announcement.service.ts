import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnnouncementService {
  constructor(private p: PrismaService) {}

  async getAllAnnouncement() {
    const announcement = await this.p.announcement.findMany({
      include: {
        student: true,
      },
    });
    return {
      message: 'success get all announcement',
      status: 200,
      data: announcement,
    };
  }

  async handleTestCompletion(studentID: string) {
    const studentTests = await this.p.studentTest.findMany({
      where: { studentID },
    });

    const allDone =
      studentTests.length === 4 && studentTests.every((t) => t.score !== null);

    if (!allDone) {
      throw new HttpException('test not completed', 400);
    }

    const totalScore = studentTests.reduce((sum, t) => sum + (t.score || 0), 0);
    const average = totalScore / studentTests.length;

    const status = average >= 75 ? 'PASSED' : 'FAILED';

    const existing = await this.p.announcement.findUnique({
      where: { studentID },
    });

    if (!existing) {
      await this.p.announcement.create({
        data: {
          studentID,
          title: 'Test Result',
          message: `Siswa dinyatakan ${status == 'PASSED' ? 'lulus' : 'gagal'} di SMK MadinatulQuran`,
          scoreAvg: average,
          status,
        },
      });
    }
  }

  async createAnnouncement(payload: any) {
    try {
      const announcement = await this.p.announcement.create({
        data: {
          studentID: payload.studentID,
          title: 'Test Result',
          message: `Siswa dinyatakan ${payload.status} di SMK MadinatulQuran`,
          status: payload.status,
          scoreAvg: payload.scoreAvg,
          grade: payload.grade,
        },
      });

      return {
        message: 'success create announcement',
        status: 201,
        data: announcement,
      };
    } catch (e) {
      if (e) {
        console.log(e);
        throw new HttpException('internal server error', 500);
      }
    }
  }

  async publishAnnouncement(id: string) {
    try {
      const announcement = await this.p.announcement.findFirst({
        where: {
          ID: id,
        },
      });

      if (!announcement) {
        throw new HttpException("announcement doesn't exist", 400);
      } else {
        await this.p.announcement.update({
          where: {
            ID: id,
          },
          data: {
            isPublished: true,
            publishAt: new Date(),
          },
        });
        return {
          message: 'success publish announcement',
          status: 200,
        };
      }
    } catch (e) {
      if (e) {
        throw new HttpException('internal server error', 500);
      }
    }
  }

  async getAnnouncementById(announcementId: string) {
    const announcement = await this.p.announcement.findUnique({
      where: { ID: announcementId },
      select: {
        title: true,
        status: true,
        scoreAvg: true,
        grade: true,
        message: true,
        isPublished: true,
        publishAt: true,
        student: {
          select: {
            fullName: true,
            NISN: true,
            major: true,
            from_school: true,
            age: true,
            testType: true,
          },
        },
        studentTest: {
          select: {
            test: { select: { title: true } },
            score: true,
            startedAt: true,
            finishedAt: true,
          },
        },
      },
    });

    if (!announcement) {
      throw new NotFoundException('Announcement not found');
    }

    return {
      message: 'success get announcement',
      status: 200,
      data: {
        ...announcement,
        publishAt: announcement.publishAt?.toISOString(),
        studentTests: announcement.studentTest.map((test) => ({
          ...test,
          startedAt: test.startedAt.toISOString(),
          finishedAt: test.finishedAt ? test.finishedAt : null,
        })),
        student: announcement.student,
      },
    };
  }
}
