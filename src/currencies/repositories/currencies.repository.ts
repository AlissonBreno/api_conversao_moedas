import { InternalServerErrorException } from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { CurrenciesEntity } from '../entities/currencies.entity';
import { CurrenciesInputType } from '../types/currencies-input.types';

@EntityRepository(CurrenciesEntity)
export class CurrenciesRepository extends Repository<CurrenciesEntity> {
  async getCurrency(currency: string): Promise<CurrenciesEntity> {
    const response = await this.findOne({ currency });

    if (!response) {
      throw new InternalServerErrorException();
    }

    return response;
  }

  async createCurrency(params: CurrenciesInputType): Promise<CurrenciesEntity> {
    const createCurrency = new CurrenciesEntity();
    createCurrency.currency = params.currency;
    createCurrency.value = params.value;

    try {
      await validateOrReject(createCurrency);
      await this.save(createCurrency);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return createCurrency;
  }

  async updateCurrency(params: CurrenciesInputType): Promise<CurrenciesEntity> {
    const { currency, value } = params;
    return new CurrenciesEntity();
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
