import { Module } from '@nestjs/common';
import { StudentTestsService } from './student-tests.service';
import { StudentTestsController } from './student-tests.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [StudentTestsService],
  controllers: [StudentTestsController]
})
export class StudentTestsModule {}
