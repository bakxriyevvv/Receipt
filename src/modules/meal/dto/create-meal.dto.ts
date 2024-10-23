import { IsNotEmpty, IsString, IsInt, IsOptional, IsUrl } from 'class-validator';
import { CreateMealRequest } from '../interfaces';

export class CreateMealDto implements Omit<CreateMealRequest, 'image'> {
  
  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  image?: any;

  @IsOptional()
  video?:any

  @IsNotEmpty()
  category_id: string;

  @IsNotEmpty()
  user_id: string;
}
