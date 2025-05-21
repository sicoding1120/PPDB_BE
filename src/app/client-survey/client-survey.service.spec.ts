import { Test, TestingModule } from '@nestjs/testing';
import { ClientSurveyService } from './client-survey.service';

describe('ClientSurveyService', () => {
  let service: ClientSurveyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientSurveyService],
    }).compile();

    service = module.get<ClientSurveyService>(ClientSurveyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
