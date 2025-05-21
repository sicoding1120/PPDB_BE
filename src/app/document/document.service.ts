import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private p: PrismaService) {}

  async savefile(payload: any) {
    // Save the file to the database
    const doc = await this.p.document.create({
      data: {
        Akte_url: payload.akte_url,
        familyCard_url: payload.familyCard_url,
        fatherKTP_url: payload.fatherKTP_url,
        motherKTP_url: payload.motherKTP_url,
        Ijazah_url: payload.ijazah_url || '',
        studentPicture_url: payload.studentPicture_url || '',
      },
    });

    return {
      message: 'success save document',
      status: 201,
      data: doc,
    };
  }

  async getDocument() {
    const documents = await this.p.document.findMany({
      include: {
        student: true,
      },
    });

    return {
      message: 'success get document',
      status: 200,
      data: documents,
    };
  }

  async getDocumentByStudentID(id: string) {
    const document = await this.p.student.findUnique({
      where: {
        ID: id,
      },
      select: {
        document: true,
      },
    });

    if (!document) {
      throw new HttpException('Document not found', 404);
    }

    return {
      message: 'success get student document',
      status: 200,
      data: document,
    };
  }

  async updateStatusDoc(payload: any, id: string) {
    try {
      const doc = await this.p.document.findFirst({
        where: {
          ID: id,
        },
      });
      if (!doc) {
        throw new HttpException('Document not found', 404);
      } else {
        await this.p.document.update({
          where: {
            ID: id,
          },
          data: {
            status: payload.status,
          },
        });

        return {
          message: 'success update document',
          status: 200,
        };
      }
    } catch (e) {
      if (e) {
        console.log(e);
        throw new HttpException('internal server error', 500);
      }
    }
  }
}
