import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTestService } from './category_test.service';

describe('CategoryTestService', () => {
  let service: CategoryTestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoryTestService],
    }).compile();

    service = module.get<CategoryTestService>(CategoryTestService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
