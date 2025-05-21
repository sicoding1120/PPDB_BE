import { Module } from '@nestjs/common';
import { CategoryTestService } from './category_test.service';
import { CategoryTestController } from './category_test.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports:[PrismaModule],
  providers: [CategoryTestService],
  controllers: [CategoryTestController]
})
export class CategoryTestModule {}
