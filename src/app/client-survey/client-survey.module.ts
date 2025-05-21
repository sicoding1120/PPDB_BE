import { Module } from '@nestjs/common';
import { ClientSurveyService } from './client-survey.service';
import { ClientSurveyController } from './client-survey.controller';

@Module({
  providers: [ClientSurveyService],
  controllers: [ClientSurveyController]
})
export class ClientSurveyModule {}
