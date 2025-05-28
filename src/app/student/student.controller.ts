import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './student.dto';

@Controller('student')
export class StudentController {
  constructor(private ss: StudentService) {}

  @Get('/')
  async getAllStudents() {
    return await this.ss.getAllStudents();
  }

  @Post('/create')
  async createStudent(@Body() payload: CreateStudentDto) {
    return await this.ss.createStudent(payload);
  }

  @Get("/user/:id")
  async getStudentByUserID(@Param('id') id: string) {
    return await this.ss.getStudentByUserID(id);
  }

  @Get("/userFather/:id")
async getStudentByFatherID(@Param('id') id: string) {
  return await this.ss.getStudentByFatherID(id);
}

  @Get('/overview')
  async getDataOverview() {
    return await this.ss.studentOverview();
  }

  @Get('/parents')
  async ggetParents() {
    return await this.ss.getParents();
  }
  @Get('/parents/:id')
  async getParentByStudentId(@Param('id') id: string) {
    return await this.ss.getParentByStudentId(id);
  }
  @Get('/:id')
  async getStudentById(@Param('id') id: string) {
    return await this.ss.getStudentById(id);
  }

  @Delete('/delete/:id')
  async deleteStudent(@Param('id') id: string) {
    return await this.ss.deleteStudentById(id);
  }

  @Put("/update/doc/:id")
  async updateDoc(@Body() payload:any, @Param("id") id:string) {

  }
}
