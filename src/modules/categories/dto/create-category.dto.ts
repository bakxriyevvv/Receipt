import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateCategoryRequest } from '../interfaces';

export class CreateCategoryDto implements Omit<CreateCategoryRequest, 'image'>  {
  
  id: number;
  
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @IsOptional()
  image?: any;
}
