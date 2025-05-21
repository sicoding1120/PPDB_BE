import { Test, TestingModule } from '@nestjs/testing';
import { CategoryTestController } from './category_test.controller';

describe('CategoryTestController', () => {
  let controller: CategoryTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CategoryTestController],
    }).compile();

    controller = module.get<CategoryTestController>(CategoryTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
