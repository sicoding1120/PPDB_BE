import { Test, TestingModule } from '@nestjs/testing';
import { ClientSurveyController } from './client-survey.controller';

describe('ClientSurveyController', () => {
  let controller: ClientSurveyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientSurveyController],
    }).compile();

    controller = module.get<ClientSurveyController>(ClientSurveyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
