import { Controller, Get, Param, Post } from '@nestjs/common';
import { StudentAnswerService } from './student-answer.service';

@Controller('student-answer')
export class StudentAnswerController {
    constructor(private studentAnswerService: StudentAnswerService) {}


    @Post("/save")
    async answerQuestion(payload: any) {
        return await this.studentAnswerService.answerQuestion(payload);
    }

    @Get("/by-student-test/:id")
    async getAnswerByStudentTestID(@Param("id") id: string) {
        return await this.studentAnswerService.getAnswerByStudentTestID(id)
    }
}
