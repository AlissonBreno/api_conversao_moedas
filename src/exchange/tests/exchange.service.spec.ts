import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from '../exchange.service';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;

  beforeEach(async () => {
    const currenciesServiceMock = {
      getCurrency: jest.fn().mockReturnValue({ value: 1 }),
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

  describe('convertAmount()', () => {
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
    describe('getCurrency()', () => {
      it('should be called twice', async () => {
        await service.covnertAmount({ from: 'USD', to: 'BRL', amount: 1 });
        await expect(currenciesService.getCurrency).toBeCalledTimes(2);
      });

      it('should be called with correct params', async () => {
        await service.covnertAmount({ from: 'USD', to: 'BRL', amount: 1 });
        await expect(currenciesService.getCurrency).toBeCalledWith('USD');
        await expect(currenciesService.getCurrency).toHaveBeenLastCalledWith(
          'BRL'
        );
      });

      it('should be throw', async () => {
        (currenciesService.getCurrency as jest.Mock).mockRejectedValue(
          new Error()
        );
        await expect(
          service.covnertAmount({ from: 'INVALID', to: 'BRL', amount: 1 })
        ).rejects.toThrow();
      });

      it('should be return conversion value', async () => {
        (currenciesService.getCurrency as jest.Mock).mockResolvedValue({
          value: 1,
        });
        expect(
          await service.covnertAmount({ from: 'USD', to: 'USD', amount: 1 })
        ).toEqual({ amount: 1 });

        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 1,
        });
        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 0.2,
        });
        expect(
          await service.covnertAmount({ from: 'USD', to: 'BRL', amount: 1 })
        ).toEqual({ amount: 5 });

        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 0.2,
        });
        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 1,
        });
        expect(
          await service.covnertAmount({ from: 'BRL', to: 'USD', amount: 1 })
        ).toEqual({ amount: 0.2 });
      });
    });
  });
});
