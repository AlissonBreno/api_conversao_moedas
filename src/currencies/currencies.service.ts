import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCurrencyDto } from './dto/create-currency.dto';
import { CurrenciesEntity } from './entities/currencies.entity';
import { CurrenciesRepository } from './repositories/currencies.repository';

@Injectable()
export class CurrenciesService {
  constructor(private currenciesRepository: CurrenciesRepository) {}

  async getCurrency(currency: string): Promise<CurrenciesEntity> {
    return await this.currenciesRepository.getCurrency(currency);
  }

  async createCurrency(params: CreateCurrencyDto): Promise<CurrenciesEntity> {
    if (params.value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }

    return await this.currenciesRepository.createCurrency(params);
  }

  async updateCurrency(params: CreateCurrencyDto): Promise<CurrenciesEntity> {
    if (params.value <= 0) {
      throw new BadRequestException('The value must be greater than zero.');
    }

    return await this.currenciesRepository.updateCurrency(params);
  }

  async deleteCurrency(currency: string): Promise<void> {
    return await this.currenciesRepository.deleteCurrency(currency);
  }
}
