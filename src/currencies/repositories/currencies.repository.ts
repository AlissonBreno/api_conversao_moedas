import {
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { validateOrReject } from 'class-validator';
import { EntityRepository, Repository } from 'typeorm';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
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

  async createCurrency(params: CreateCurrencyDto): Promise<CurrenciesEntity> {
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

  async updateCurrency(params: CreateCurrencyDto): Promise<CurrenciesEntity> {
    const { currency, value } = params;
    const response = await this.findOne({ currency });

    if (!response) {
      throw new NotFoundException(`The currency ${currency} was not found.`);
    }

    try {
      response.value = value;
      await this.save(response);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }

    return response;
  }

  async deleteCurrency(currency: string): Promise<void> {
    const response = await this.findOne({ currency });

    if (!response) {
      throw new NotFoundException(`The currency ${currency} was not found.`);
    }

    try {
      await this.delete({ currency });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
