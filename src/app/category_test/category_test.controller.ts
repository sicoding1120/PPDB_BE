import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoryTestService } from './category_test.service';

@Controller('category-test')
export class CategoryTestController {
  constructor(private cts: CategoryTestService) {}

  @Post('/save')
  async createCategoryTest(@Body() payload: any) {
    return await this.cts.createCategoryTest(payload);
  }

  @Get("/")
  async getAllCategoryTest() {
    return await this.cts.getAllCategoryTest();
  }
}
