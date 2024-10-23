import { ApiProperty } from '@nestjs/swagger';
import { UploadProductImageRequest } from '../interfaces/upload-product.image.dto';
import { IsNumberString } from 'class-validator';

export class UpdateProductImageDto implements Omit<UploadProductImageRequest, 'image'>
{
  @ApiProperty({
    type: 'number',
    required: true,
    example: 1,
  })
  @IsNumberString()
  productId: number;

  @ApiProperty({
    type: String,
    format: 'binary',
    required: true,
  })
  image: any;
}
