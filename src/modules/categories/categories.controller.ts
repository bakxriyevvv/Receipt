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
} from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { Protected } from '../../decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryImageDto } from './dto';
import { Meal } from '../meal';
import { Categories } from './models';

@ApiTags("Categories")
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  // Barcha kategoriyalarni olish va render qilish
  @Protected(true)
  @Get()
  // @Render('\index.ejs')  // index.ejs faylini render qilish
  async getAllCategoris() {
    const categories = await this.service.getAllCategory();
    return { categories , Meal };  // EJS shabloniga kategoriyalarni yuborish
  }

  @Protected(true)
  @Get('category')
  async getAllCategories(): Promise<Categories[]> {
    return await this.service.getAllCategory();
  }

  // @Get(':id')
// async findOne(@Param('id', ParseIntPipe) id: number): Promise<CreateCategoryRequest> {
//   const category = await this.service.findOne(id);
//   if (!category) {
//     throw new NotFoundException('Category not found');
//   }
//   return category;
// }

  // Yangi kategoriya yaratish
  @ApiBearerAuth()
  @Protected(true)
  @ApiConsumes('multipart/form-data')
  @Post('category/add')
  @UseInterceptors(FileInterceptor('image'))
  async createCategory(
    @Body() payload: CreateCategoryDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.create({ ...payload, image });
  }

  // Kategoriya rasm yuklash
  @ApiBearerAuth()
  @Protected(true)
  @ApiConsumes('multipart/form-data')
  @Post('/add/image')
  @UseInterceptors(FileInterceptor('image'))
  async uploadCategoryImage(
    @Body() payload: UpdateCategoryImageDto,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.service.uploadCategoryImage({ ...payload, image });
  }

  // Kategoriyani ID bo'yicha o'chirish
  @ApiBearerAuth()
  @Protected(true)
  @Delete('/delete/:categoriesId')  // parametr nomini to'g'rilash
  @ApiOperation({ summary: "Kategoriyani o'chirish" })
  async deleteCategory(
    @Param('categoriesId', ParseIntPipe) categoriesId: number,
  ): Promise<void> {
    await this.service.remove(categoriesId);
  }

  // Kategoriya ID bo'yicha ovqatlar ma'lumotlarini olish
  @ApiBearerAuth()
  @Protected(true)
  @Get('meals/:id')
  @ApiOperation({ summary: "Kategoriya ID bo'yicha ovqatlar ma'lumotlarini olish" })
  async getMealsByCategory(@Param('id', ParseIntPipe) id: number) {
    const category = await this.service.findOne(id); // Kategoriya ma'lumotlarini olish
    const meals = await this.service.getMealsByCategory(id); // Kategoriya ID bo'yicha ovqatlar
    return { category, meals }; // Kategoriya va ovqatlar ma'lumotlarini qaytarish
  }
}
