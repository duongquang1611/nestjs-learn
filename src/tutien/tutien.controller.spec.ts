import { Test, TestingModule } from '@nestjs/testing';
import { TutienController } from './tutien.controller';

describe('TutienController', () => {
  let controller: TutienController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TutienController],
    }).compile();

    controller = module.get<TutienController>(TutienController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
