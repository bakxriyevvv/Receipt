import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseInterceptors,
  Render,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected } from '../../decorator';
import { ProductService } from './product.service';
import { Product } from './models';
import { CreateProductDto, UpdateProductImageDto } from './dto';

@ApiTags("Products")
@Controller('products')
export class ProductController {
  constructor(private service: ProductService) {}

  @Protected(true)
  @Get()
  @Render('\index.ejs') // Render the products page
  async getAllProducts() {
    const products = await this.service.getAllUsers(); // Fetch all products
    return { products }; // Send products data to the frontend
  }

  @Get('product')
  async getAllProduct(): Promise<Product[]> {
    return await this.service.getAllUsers();
  }

 
  @ApiBearerAuth()
  @Protected(true)
  @ApiConsumes('multipart/form-data')
  @Post('/add')
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(
    @Body() payload: CreateProductDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.create({ ...payload, image });
  }

  @ApiBearerAuth()
  @Protected(true)
  @ApiConsumes('multipart/form-data')
  @Post('/add/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadProductImage(
    @Body() payload: UpdateProductImageDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.uploadUserImage({ ...payload, image });
  }

  @ApiBearerAuth()
  @Protected(true)
  @Delete('/delete/:productId')
  @ApiOperation({ summary: "Productni o'chirish" })
  async deleteProduct(
    @Param('productId', ParseIntPipe) productId: number,
  ): Promise<void> {
    await this.service.remove(productId);
  }
}
