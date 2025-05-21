import { Test, TestingModule } from '@nestjs/testing';
import { StudentTestsController } from './student-tests.controller';

describe('StudentTestsController', () => {
  let controller: StudentTestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StudentTestsController],
    }).compile();

    controller = module.get<StudentTestsController>(StudentTestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
