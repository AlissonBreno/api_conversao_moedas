import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

export class CurrenciesEntity {
  currency: string;
  value: string;
}
export class CurrenciesRepository {
  async getCurrency(currency: string): Promise<CurrenciesEntity> {
    return new CurrenciesEntity();
  }

  async createCurrency({ currency, value }): Promise<CurrenciesEntity> {
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
      throw new BadRequestException('The value must be grater than zero.');
    }

    return await this.currenciesRepository.createCurrency({ currency, value });
  }
}
