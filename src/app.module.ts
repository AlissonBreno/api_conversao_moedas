import { Module } from '@nestjs/common';
import { ExchangeModule } from './exchange/exchange.module';
import { CurrenciesModule } from './currencies/currencies.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 15432,
      username: 'postgres',
      password: 'pass123',
      database: 'teste_rd',
      synchronize: true,
      dropSchema: false,
      logging: false,
      entities: ['dist/**/entities/*.entity.js'],
    }),
    ExchangeModule,
    CurrenciesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
