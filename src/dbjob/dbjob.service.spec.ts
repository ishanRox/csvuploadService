import { Test, TestingModule } from '@nestjs/testing';
import { DbjobService } from './dbjob.service';

describe('DbjobService', () => {
  let service: DbjobService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DbjobService],
    }).compile();

    service = module.get<DbjobService>(DbjobService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
