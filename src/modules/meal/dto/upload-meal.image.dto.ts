import { ApiProperty } from '@nestjs/swagger';
import { UploadMealImageRequest } from '../interfaces/upload-meal.image.interfaces';
import { IsNumberString } from 'class-validator';

export class UpdateMealImageDto implements Omit<UploadMealImageRequest, 'image'>
{
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumberString()
  mealId: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  image: any;
}
