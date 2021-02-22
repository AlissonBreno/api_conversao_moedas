import { Controller, Get, Param } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesEntity } from './entities/currencies.entity';

@Controller('currencies')
export class CurrenciesController {
  constructor(private currenciesService: CurrenciesService) {}

  @Get('/:currency')
  async getCurrency(
    @Param('currency') currency: string
  ): Promise<CurrenciesEntity> {
    return await this.currenciesService.getCurrency(currency);
  }
}
