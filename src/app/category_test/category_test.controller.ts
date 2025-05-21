import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryTestService } from './category_test.service';

@Controller('category-test')
export class CategoryTestController {
  constructor(private cts: CategoryTestService) {}

  @Post('/save')
  async createCategoryTest(@Body() payload: any) {
    return await this.cts.createCategoryTest(payload);
  }

  @Get('/')
  async getAllCategoryTest() {
    return await this.cts.getAllCategoryTest();
  }
  @Get('/:id')
  async getDetailCategoryTest(@Param('id') id: string) {
    return await this.cts.getDetailCategoryTest(id)
  }
  @Delete('/delete/:id')
  async deleteCategoryTestByID(@Param('id') id: string) {
    return await this.cts.deleteCategoryTestByID(id);
  }

  @Put('/update/:id')
  async updateCategoryTest(@Param('id') id: string, @Body() payload: any) {
    return await this.cts.updateCategoryTest(payload, id);
  }
}
