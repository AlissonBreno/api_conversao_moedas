import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, Length } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Unique(['currency'])
@Entity()
export class CurrenciesEntity {
  @PrimaryColumn()
  @Length(3, 3)
  @IsNotEmpty()
  currency: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  value: number;

  @CreateDateColumn({ type: 'timestamp' })
  createAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  UpdateAt: Date;
}
