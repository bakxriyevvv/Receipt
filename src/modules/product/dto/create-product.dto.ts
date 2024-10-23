import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { CreateProductRequest } from '../interfaces';

export class CreateProductDto implements Omit<CreateProductRequest, 'image'> {

  id: number;
  
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  image?: any;
}
