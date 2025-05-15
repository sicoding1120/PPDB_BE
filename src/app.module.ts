import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './app/student/student.module';
import { PrismaService } from './prisma/prisma.service';
import { ParentModule } from './app/parent/parent.module';

@Module({
  imports: [AuthModule, PrismaModule, StudentModule, ParentModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
