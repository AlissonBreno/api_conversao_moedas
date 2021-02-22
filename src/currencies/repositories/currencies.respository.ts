import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CurrenciesEntity } from '../entities/currencies.entity';

@EntityRepository(CurrenciesEntity)
export class CurrenciesRepository extends Repository<CurrenciesEntity> {
  async getCurrency(currency: string): Promise<CurrenciesEntity> {
    const response = await this.findOne({ currency });

    if (!response) {
      throw new InternalServerErrorException();
    }

    return response;
  }

  async createCurrency({ currency, value }): Promise<CurrenciesEntity> {
    return new CurrenciesEntity();
  }

  async updateCurrency({ currency, value }): Promise<CurrenciesEntity> {
    return new CurrenciesEntity();
  }

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
