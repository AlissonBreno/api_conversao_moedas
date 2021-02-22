import { timeStamp } from 'console';
import {
  Column,
  CreateDateColumn,
  Entity,
  ObjectIdColumn,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['currency'])
@Entity()
export class CurrenciesEntity {
  @ObjectIdColumn()
  _id: string;

  @PrimaryColumn()
  currency: string;

  @Column()
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  UpdateAt: Date;
}
