import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(private p: PrismaService) { }
    

    async Register(payload:any) {

    }

    async Login(payload: any) {
        const user = await this.p.user.findUnique({
            where: {
                email: payload.email,
                phone: payload.phone
            }
        })
   }
}
