import { Module } from '@nestjs/common';
import { StudentTestsService } from './student-tests.service';
import { StudentTestsController } from './student-tests.controller';

@Module({
  providers: [StudentTestsService],
  controllers: [StudentTestsController]
})
export class StudentTestsModule {}
