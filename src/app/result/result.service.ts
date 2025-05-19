import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ResultService {
    constructor(private p: PrismaService) { }
    

    async saveResultMTKTest(payload:any) {
        console.log(payload.score);
        console.log(payload.nama);
    }
}
