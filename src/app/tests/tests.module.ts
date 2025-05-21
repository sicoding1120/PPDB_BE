import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TestService } from './tests.service';
import { TestController } from './tests.controller';

@Module({
  imports: [PrismaModule],
  providers: [TestService],
  controllers: [TestController],
})
export class TestsModule {}
