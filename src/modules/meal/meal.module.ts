import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { MealService } from './meal.service';
import { Meal } from './models'; // Meal modelini import qiling
import { UploadService } from '../upload';
import { MealController } from './meal.controller';

@Module({
  imports: [
    SequelizeModule.forFeature([Meal]), // Meal modelini qo'shing
  ],
  controllers: [MealController], // MealControllerni qo'shing
  providers: [MealService, UploadService],
  exports: [MealService], // MealService ni eksport qilish
})
export class MealModule {}
