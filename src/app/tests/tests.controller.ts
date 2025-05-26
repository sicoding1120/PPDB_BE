import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { TestService } from './tests.service';

@Controller('tests')
export class TestController {
  constructor(private readonly testService: TestService) {}

  @Post("/save")
  async create(@Body() payload: any) {
    return await this.testService.createTest(payload);
  }

  @Get()
  async findAll() {
    return await this.testService.getAllTests();
  }

  @Get('/detail/:id')
  async findOne(@Param('id') id: string) {
    return await this.testService.getTestDetail(id);
  }

  @Patch('/update/:id')
  async update(@Param('id') id: string, @Body() payload: any) {
    return await this.testService.updateTest(id, payload);
  }

  @Delete('/delete/:id')
  async remove(@Param('id') id: string) {
    return await this.testService.deleteTest(id);
  }

}
