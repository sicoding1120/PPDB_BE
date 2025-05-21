import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { PaymentService } from './payment.service';

@Controller('payment')
export class PaymentController {
    constructor(private ps: PaymentService) { }
    

    @Get("/")
    async getAllPayment() {
        return await this.ps.getAllTransactions();
    }

    @Post("/save")
    async saveTransactions(@Body() payload:any) {
        return await this.ps.saveTransactions(payload);
    }

    @Put("/update/:id")
    async updateStatusTransactionsByAdmin(@Body() payload:any, @Param("id") id:string) {
        return await this.ps.updateStatusTransactionsByAdmin(payload, id);
    }

    @Get("/:id")
    async detailTransaction(@Param("id") id:string) {
        return await this.ps.detailTransaction(id);
    }
}
