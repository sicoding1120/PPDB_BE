import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DocumentService {
  constructor(private p: PrismaService) {}

  async savefile(payload: any) {
    const { file, userId } = payload;
    const { originalname, buffer } = file;

    // Save the file to the database
    const document = await this.p.document.create({
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
      data: payload,
    };
  }

  async getDocument() {
    const documents = await this.p.document.findMany();

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
}
