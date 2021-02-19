import { Injectable } from '@nestjs/common';

@Injectable()
export class ExchangeService {
  async covnertAmount({ from, to, amount }): Promise<any> {
    throw new Error();
  }
}
