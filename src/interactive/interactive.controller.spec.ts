import { Test, TestingModule } from '@nestjs/testing';
import { InteractiveController } from './interactive.controller';
import { InteractiveService } from './interactive.service';

describe('InteractiveController', () => {
  let controller: InteractiveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InteractiveController],
      providers: [InteractiveService],
    }).compile();

    controller = module.get<InteractiveController>(InteractiveController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
