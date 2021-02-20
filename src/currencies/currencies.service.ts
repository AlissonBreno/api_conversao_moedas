import { BadRequestException, Injectable } from '@nestjs/common';

export class CurrenciesEntity {
  currency: string;
  value: number;
}
export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<CurrenciesEntity> {
    return new CurrenciesEntity();
  }

  async createCurrency({ currency, value }): Promise<CurrenciesEntity> {
    return new CurrenciesEntity();
  }

  async updateCurrency({ currency, value }): Promise<CurrenciesEntity> {
    return new CurrenciesEntity();
  }
}

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async getCurrency(currency: string): Promise<CurrenciesEntity> {
    return await this.currenciesRepository.getCurrency(currency);
  }

  async createCurrency({ currency, value }): Promise<CurrenciesEntity> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }

    return await this.currenciesRepository.createCurrency({ currency, value });
  }

  async updateCurrency({ currency, value }): Promise<CurrenciesEntity> {
    if (value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }

    return await this.currenciesRepository.updateCurrency({ currency, value });
  }
}
