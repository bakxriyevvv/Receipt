import { IsNotEmpty, IsString, IsInt } from 'class-validator';
import { Receipt } from '../interfaces';

export class CreateReceiptDto implements Receipt {
  @IsNotEmpty()
  @IsInt()
  product_id: number;

  @IsNotEmpty()
  @IsInt()
  meal_id: number;

  @IsNotEmpty()
  @IsString()
  quantity: string;
}
