import { BadRequestException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CurrenciesService, ExchangeService } from '../exchange.service';
import { ExchangeInputType } from '../types/exchange-input.types';

describe('ExchangeService', () => {
  let service: ExchangeService;
  let currenciesService: CurrenciesService;
  let mockData;

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
    mockData = { from: 'USD', to: 'BRL', amount: 1 } as ExchangeInputType;
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('convertAmount()', () => {
    describe('if called with invalid params', () => {
      it('should be throw an error', async () => {
        mockData.from = '';
        await expect(service.covnertAmount(mockData)).rejects.toThrow();

        mockData.from = 'USD';
        mockData.amount = 0;
        await expect(service.covnertAmount(mockData)).rejects.toThrow();

        mockData.from = 'USD';
        mockData.to = '';
        mockData.amount = 1;
        await expect(service.covnertAmount(mockData)).rejects.toThrow();
      });
    });

    describe('if called with valid params', () => {
      it('should be not throw an error', async () => {
        await expect(service.covnertAmount(mockData)).resolves.not.toThrow(
          new BadRequestException()
        );
      });
    });
    describe('getCurrency()', () => {
      it('should be called twice', async () => {
        await service.covnertAmount(mockData);
        expect(currenciesService.getCurrency).toBeCalledTimes(2);
      });

      it('should be called with correct params', async () => {
        await service.covnertAmount(mockData);
        expect(currenciesService.getCurrency).toBeCalledWith('USD');
        expect(currenciesService.getCurrency).toHaveBeenLastCalledWith('BRL');
      });

      it('should be throw', async () => {
        (currenciesService.getCurrency as jest.Mock).mockRejectedValue(
          new Error()
        );

        mockData.from = 'INVALID';
        mockData.to = 'BRL';
        mockData.amount = 1;
        await expect(service.covnertAmount(mockData)).rejects.toThrow();
      });

      it('should be return conversion value', async () => {
        (currenciesService.getCurrency as jest.Mock).mockResolvedValue({
          value: 1,
        });

        mockData.from = 'USD';
        mockData.to = 'USD';
        mockData.amount = 1;
        expect(await service.covnertAmount(mockData)).toEqual({ amount: 1 });

        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 1,
        });
        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 0.2,
        });

        mockData.from = 'USD';
        mockData.to = 'BRL';
        expect(await service.covnertAmount(mockData)).toEqual({ amount: 5 });

        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 0.2,
        });
        (currenciesService.getCurrency as jest.Mock).mockResolvedValueOnce({
          value: 1,
        });

        mockData.from = 'BRL';
        mockData.to = 'USD';
        mockData.amount = 1;
        expect(await service.covnertAmount(mockData)).toEqual({ amount: 0.2 });
      });
    });
  });
});
