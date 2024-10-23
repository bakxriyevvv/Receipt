import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Categories } from './models';
import { CreateCategoryDto } from './dto';
import { UploadService, UploadFileResponse } from '../upload';
import { UploadCategoryImageRequest } from './interfaces';
import { Meal } from '../meal';
@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Categories)
    private readonly categoriesModel: typeof Categories,
    @InjectModel(Meal) // Meal modelini inject qilish
    private readonly mealsModel: typeof Meal,
    private uploadService: UploadService,
  ) {}

  // Kategoriya yaratish
  async create(payload: CreateCategoryDto): Promise<Categories> {
    let imageUrl: null | UploadFileResponse = null;

    // Agar rasm mavjud bo'lsa, yuklab olish
    if (payload?.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }
    
    // Yangi kategoriya yaratish
    const category = await this.categoriesModel.create({
      name: payload.name,
      image: imageUrl ? imageUrl.imageUrl : '',
    });

    return category; // Yaratilgan kategoriyani qaytarish
  }

  async getMealsByCategory(categoryId: number): Promise<Meal[]> {
    // Ovqatlar modelini chaqirish va kategoriya ID si orqali filtrlaymiz
    return await this.mealsModel.findAll({
      where: {
        category_id: categoryId,
      },
    });
  }
  
  // Kategoriya rasm yuklash
  async uploadCategoryImage(payload: UploadCategoryImageRequest): Promise<void> {
    await this._checkUser(payload.categoryId);

    let imageUrl: null | UploadFileResponse = null;

    // Rasm yuklash
    if (payload.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }

    // Kategoriya rasm URL ini yangilash
    await this.categoriesModel.update(
      { image: imageUrl ? imageUrl.imageUrl : '' },
      { where: { id: payload.categoryId } },
    );
  }

  // Barcha kategoriyalarni olish
  async getAllCategory(): Promise<Categories[]> {
    return await this.categoriesModel.findAll({});
  }
  async getAllCategories(): Promise<Categories[]> {
    return await this.categoriesModel.findAll({});
  }

  // Berilgan ID bo'yicha kategoriya ma'lumotlarini olish
  async findOne(id: number): Promise<Categories> {
    const category = await this.categoriesModel.findByPk(id);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  // Kategoriya o'chirish
  async remove(id: number): Promise<void> {
    const category = await this.findOne(id);
    await category.destroy();
  }

  // Kategoriyaning mavjudligini tekshirish
  private async _checkUser(categoryId: number): Promise<void> {
    const category = await this.categoriesModel.findByPk(categoryId);
    if (!category) {
      throw new NotFoundException('Category not found');
    }
  }
}
