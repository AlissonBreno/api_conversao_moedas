import { InternalServerErrorException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { execPath } from 'process';
import { CurrenciesEntity } from '../entities/currencies.entity';
import { CurrenciesRepository } from '../repositories/currencies.respository';

describe('CurrenciesRepository()', () => {
  let repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CurrenciesRepository],
    }).compile();

    repository = module.get<CurrenciesRepository>(CurrenciesRepository);
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('getCurrency()', () => {
    it('should be called findOne with correct params', async () => {
      repository.findOne = jest.fn().mockReturnValue({});

      await repository.getCurrency('USD');
      expect(repository.findOne).toBeCalledWith({ currency: 'USD' });
    });

    it('should be throw if findOne returns empty', async () => {
      repository.findOne = jest.fn().mockReturnValue(undefined);

      await expect(repository.getCurrency('USD')).rejects.toThrow(
        new InternalServerErrorException()
      );
    });

    it('should be return when findOne return', async () => {
      const mockData = { currency: 'USD', value: 1 } as CurrenciesEntity;
      repository.findOne = jest.fn().mockReturnValue(mockData);
      expect(await repository.getCurrency('USD')).toEqual(mockData);
    });
  });

  describe('createCurrency()', () => {
    it('should ', () => {});
  });
});
