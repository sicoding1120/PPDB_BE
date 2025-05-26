import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Patch,
  Query,
} from '@nestjs/common';
import { StudentTestsService } from './student-tests.service';
import { CreateStudentTestDto, UpdateStudentTestDto } from './student-test.dto';

@Controller('student-tests')
export class StudentTestsController {
  constructor(private readonly studentTestService: StudentTestsService) {}

  @Post("/save")
  async create(@Body() dto: CreateStudentTestDto) {
    return this.studentTestService.createStudentTest(dto);
  }

  @Patch('/update/:id/finish')
  async finish(@Param('id') id: string, @Body() dto: UpdateStudentTestDto) {
    return this.studentTestService.finishStudentTest(id, dto);
  }

  @Get()
  async findAll() {
    return this.studentTestService.getAllStudentTests();
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    return this.studentTestService.getStudentTestById(id);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return this.studentTestService.deleteStudentTest(id);
  }

  @Get('/check/status')
  async checkStatus(
    @Query('studentID') studentID: string,
    @Query('testID') testID: string,
  ) {
    return this.studentTestService.checkStudentTestStatus(studentID, testID);
  }
}
