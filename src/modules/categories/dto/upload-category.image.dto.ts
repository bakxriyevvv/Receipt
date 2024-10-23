import { ApiProperty } from '@nestjs/swagger';
import { UploadCategoryImageRequest } from '../interfaces';
import { IsNumberString } from 'class-validator';

export class UpdateCategoryImageDto implements Omit<UploadCategoryImageRequest, 'image'>
{
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumberString()
  categoryId: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  image: any;
}
