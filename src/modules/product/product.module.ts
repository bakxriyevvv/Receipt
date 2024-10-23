import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './models';
import { Receipt, ReceiptModule } from '../recept';
import { UploadService } from '../upload';

@Module({
  imports: [SequelizeModule.forFeature([Product])],
  controllers: [ProductController],
  providers: [ProductService,UploadService],
  exports: [ProductService]
})
export class ProductModule {}
