import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PaymentService {
  constructor(private p: PrismaService) {}

  async getAllTransactions() {
    const payments = await this.p.registrationTransaction.findMany({
      include: {
        student: true,
      },
    });
    return {
      message: 'success',
      status: 200,
      data: payments,
    };
  }

  async saveTransactions(payload: any) {
    try {
      const transaction = await this.p.registrationTransaction.findUnique({
        where: {
          reference: payload.reference,
        },
      });
      console.log(transaction);

      if (transaction) {
        throw new HttpException('Transaction already exists', 400);
      } else {
        await this.p.registrationTransaction.create({
          data: payload,
        });

        return {
          message: 'success save transactions',
          status: 201,
        };
      }
    } catch (e) {
      if (e) {
        console.log(e);
        throw new HttpException('internal server error', 500);
      }
    }
  }

  async updateStatusTransactionsByAdmin(payload: any, id: string) {
    try {
      const transaction = await this.p.registrationTransaction.findFirst({
        where: {
          ID: id,
        },
      });
      if (!transaction) {
        throw new HttpException('Transaction not found', 404);
      } else {
        await this.p.registrationTransaction.update({
          where: {
            ID: id,
          },
          data: {
            status: payload.status,
          },
        });

        return {
          message: 'success update payment',
          status: 201,
        };
      }
    } catch (e) {
      if (e) {
        console.log(e);
        throw new HttpException('internal server error', 500);
      }
    }
  }

  async detailTransaction(id: string) {
    const transactions = await this.p.registrationTransaction.findFirst({
      where: {
        ID: id,
      },
    });

    if (!transactions) {
      throw new HttpException("transcations not found", 400)
    }
    return {
      message: "success",
      status: 200,
      data: transactions
    }
  }
}
