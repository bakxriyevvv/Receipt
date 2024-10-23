import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ReceiptService } from './recept.service';
import { ReceiptController } from './recept.controller';
import { Receipt } from './models/recept.model';
import { Meal } from 'src/modules/meal';
import { Product } from 'src/modules/product';

@Module({
  imports: [SequelizeModule.forFeature([Receipt])],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
 
})
export class ReceiptModule {}
