import { Controller, Get } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('student')
export class StudentController {
    constructor(private ss:StudentService) {}

    @Get('/')
    async getAllStudents() {
        return await this.ss.getAllStudents();
    }
}
