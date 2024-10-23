import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { Categories } from './models';
import { UploadService } from '../upload';
import { Meal, MealModule } from '../meal';

@Module({
  imports: [
    SequelizeModule.forFeature([Categories, Meal]),
    MealModule, 
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService,UploadService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
