import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from '../exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExchangeService,
        { provide: CurrenciesService, useFactory: () => currenciesServiceMock },
      ],
    }).compile();

    service = module.get<ExchangeService>(ExchangeService);
    currenciesService = module.get<CurrenciesService>(CurrenciesService);
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

    describe('if called with valid params', () => {
      it('should be not throw an error', async () => {
        await expect(
          service.covnertAmount({ from: 'USD', to: 'BRL', amount: 1 })
        ).resolves.not.toThrow(new BadRequestException());
      });
    });
    describe('getCurrency() should be called', () => {
      it('twice', async () => {
        await service.covnertAmount({ from: 'USD', to: 'BRL', amount: 1 });
        await expect(currenciesService.getCurrency).toBeCalledTimes(2);
      });

      it('with correct params', async () => {
        await service.covnertAmount({ from: 'USD', to: 'BRL', amount: 1 });
        await expect(currenciesService.getCurrency).toBeCalledWith('USD');
        await expect(currenciesService.getCurrency).toHaveBeenLastCalledWith(
          'BRL'
        );
      });
    });
  });
});
