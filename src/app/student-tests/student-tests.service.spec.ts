import { Test, TestingModule } from '@nestjs/testing';
import { StudentTestsService } from './student-tests.service';

describe('StudentTestsService', () => {
  let service: StudentTestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StudentTestsService],
    }).compile();

    service = module.get<StudentTestsService>(StudentTestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
