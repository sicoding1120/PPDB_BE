import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { QuestionsService } from './questions.service';
import {
  CreateQuestionDto,
  UpdateOptionDto,
  UpdateQuestionDto,
} from './question.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private qs: QuestionsService) {}
  @Post('/save')
  create(@Body() dto: CreateQuestionDto) {
    return this.qs.createQuestion(dto);
  }

  @Post("/save/bulk")
  async createBulk(@Body() payload: any) {
    const createBulk = await this.qs.createBulkQuestions(payload);
    return {
      message: 'Questions created successfully',
      status: 201,
      data: createBulk,
    }
  }

  @Get()
  getAll() {
    return this.qs.getAllQuestions();
  }

  @Get('/detail/:id')
  getOne(@Param('id') id: string) {
    return this.qs.getQuestionById(id);
  }

  @Patch('/update/:id')
  updateQuestion(@Param('id') id: string, @Body() dto: UpdateQuestionDto) {
    return this.qs.updateQuestion(id, dto);
  }

  @Delete('/delete/:id')
  deleteQuestion(@Param('id') id: string) {
    return this.qs.deleteQuestion(id);
  }

  // Options management
  @Patch('/option/update/:id')
  updateOption(@Param('id') id: string, @Body() dto: UpdateOptionDto) {
    return this.qs.updateOption(id, dto);
  }

  @Delete('/option/delete/:id')
  deleteOption(@Param('id') id: string) {
    return this.qs.deleteOption(id);
  }

  @Get('/by-category')
  async getByCategory(
    @Query('testID') testID?: string,
    @Query('weight') weight?: number,
  ) {
    return this.qs.getQuestionsByCategory({
      testID,
      weight: weight ? Number(weight) : undefined,
    });
  }
}
