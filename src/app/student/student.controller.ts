import { Body, Controller, Get, Post } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private ss:StudentService) {}

    @Get('/')
    async getAllStudents() {
        return await this.ss.getAllStudents();
    }

    @Post('/create')
    async createStudent(@Body() payload: Student) {
        return await this.ss.createStudent(payload);

    }
}
