import { Module } from '@nestjs/common';
import { StudentAnswerService } from './student-answer.service';
import { StudentAnswerController } from './student-answer.controller';

@Module({
  providers: [StudentAnswerService],
  controllers: [StudentAnswerController]
})
export class StudentAnswerModule {}
