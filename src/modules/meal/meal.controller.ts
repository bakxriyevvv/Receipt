import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UploadedFiles,
  UseInterceptors,
  Render,
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor, FileInterceptor } from '@nestjs/platform-express';
import { Protected } from '../../decorator';
import { MealService } from './meal.service';
import { Meal } from './models';
import { CreateMealDto, UpdateMealImageDto } from './dto';
import { CategoriesService } from '../categories';

@ApiTags("Meals")
@Controller('meals')
export class MealController {
  constructor(private service: MealService) {}

  @Protected(true)
  @Get()
  @Render('index') // home.ejs sahifasini rendering qilish
  async getMeals() {
    const meals = await this.service.getAllMeal(); // Barcha meal ma'lumotlarini olish
    // const categories = await this.service.getAllCategories(); // Barcha kategoriya ma'lumotlarini olish
    return { meals }; // meals va categories ma'lumotlarini sahifaga yuborish
  }

  @Protected(true)
  @Get('all') // add an endpoint to get all meals separately
  async getAllMeals(): Promise<Meal[]> {
    return await this.service.getAllMeal();
  }

  @ApiBearerAuth()
  @Post('/add')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FilesInterceptor('files')) // 'files' - rasm va video uchun
  async createMeal(
    @Body() payload: CreateMealDto,
    @UploadedFiles() files: Express.Multer.File[], // Rasm va video fayllari
  ): Promise<void> {
    const image = files.find(file => file.mimetype.startsWith('image/')); // Rasmni aniqlash
    const video = files.find(file => file.mimetype.startsWith('video/')); // Videoni aniqlash

    await this.service.create({ 
      ...payload, 
      image, 
      video 
    });
  }

  @ApiBearerAuth()
  @Protected(true)
  @ApiConsumes('multipart/form-data')
  @Post('/add/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadUserImage(
    @Body() payload: UpdateMealImageDto,
    @UploadedFiles() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.uploadMealImage({ ...payload, image });
  }

  @ApiBearerAuth()
  @Protected(true)
  @Delete('/delete/:mealId')
  @ApiOperation({ summary: "Mealni o'chirish" })
  async deleteMeal(
    @Param('mealId', ParseIntPipe) mealId: number,
  ): Promise<void> {
    await this.service.remove(mealId);
  }
}
