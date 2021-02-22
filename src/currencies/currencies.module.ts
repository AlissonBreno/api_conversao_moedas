import { Module } from '@nestjs/common';
import { CurrenciesService } from './currencies.service';
import { CurrenciesController } from './currencies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrenciesEntity } from './entities/currencies.entity';
import { CurrenciesRepository } from './repositories/currencies.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CurrenciesEntity, CurrenciesRepository])],
  providers: [CurrenciesService],
  controllers: [CurrenciesController],
  exports: [CurrenciesService],
})
export class CurrenciesModule {}
