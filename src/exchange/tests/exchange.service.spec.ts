import { Test, TestingModule } from '@nestjs/testing';
import { ExchangeService } from '../exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ExchangeService],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('covnertAmount()', () => {
    describe('if called with invalid params', () => {
      it('should be throw an error', async () => {
        await expect(
          service.covnertAmount({ from: '', to: '', amount: 0 })
        ).rejects.toThrow();
      });
    });
  });
});
