import { IsOptional, IsString, IsInt } from 'class-validator';
import { Receipt } from '../interfaces';

export class UpdateReceiptDto implements Partial<Receipt> {
  @IsOptional()
  @IsInt()
  product_id?: number;

  @IsOptional()
  @IsInt()
  meal_id?: number;

  @IsOptional()
  @IsString()
  quantity?: string;
}
