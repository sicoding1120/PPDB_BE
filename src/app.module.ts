import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './app/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './app/student/student.module';
import { PrismaService } from './prisma/prisma.service';
import { ParentModule } from './app/parent/parent.module';
import { ResultModule } from './app/result/result.module';
import { DocumentModule } from './app/document/document.module';
import { ClientSurveyModule } from './app/client-survey/client-survey.module';
import { PaymentModule } from './app/payment/payment.module';
import { CategoryTestModule } from './app/category_test/category_test.module';
import { TestsModule } from './app/tests/tests.module';
import { QuestionsModule } from './app/questions/questions.module';
import { StudentTestsModule } from './app/student-tests/student-tests.module';
import { StudentAnswerModule } from './app/student-answer/student-answer.module';

@Module({
  imports: [AuthModule, PrismaModule, StudentModule, ParentModule, ResultModule, DocumentModule, ClientSurveyModule, PaymentModule, CategoryTestModule, TestsModule, QuestionsModule, StudentTestsModule, StudentAnswerModule],
  controllers: [AppController],
  providers: [AppService,PrismaService],
})
export class AppModule {}
