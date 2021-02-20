import { CurrenciesEntity } from '../entities/currencies.entity';

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

  async deleteCurrency(currency: string): Promise<void> {
    return;
  }
}
