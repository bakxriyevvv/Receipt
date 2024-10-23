import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Meal } from './models';
import { CreateMealDto } from './dto';
import { UploadFileResponse } from '../upload';
import { UploadService } from '../upload';
import { UploadMealImageRequest } from './interfaces';
import { Categories } from '../categories/models'; // Category model import
import { User } from '../user/models'; // User model import

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal)
    private readonly mealModel: typeof Meal,
    private readonly uploadService: UploadService,
  ) {}

  async create(payload: CreateMealDto): Promise<Meal> {
    let imageUrl: UploadFileResponse | null = null;
    let videoUrl: UploadFileResponse | null = null;

    // Rasm va videoni yuklash
    if (payload.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads', // Faqat 'uploads' papkasi
        file: payload.image,
      });
    }
    if (payload.video) {
      videoUrl = await this.uploadService.uploadFile({
        destination: 'uploads', // Faqat 'uploads' papkasi
        file: payload.video,
      });
    }

    const meal = await this.mealModel.create({
      name: payload.name,
      description: payload.description,
      image: imageUrl?.imageUrl || null, // Rasm URL
      video: videoUrl?.imageUrl || null, // Video URL
      category_id: payload.category_id,
      user_id: payload.user_id,
    });

    return meal; // Yaratilgan ovqatni qaytarish
  }

  // Fetch all meals with Category and User info
  async getAllMeal(): Promise<Meal[]> {
    return this.mealModel.findAll({
      include: [
        {
          model: Categories,
          attributes: ['id', 'name', 'image', 'createdAt', 'updatedAt'],
        },
        {
          model: User,
          attributes: ['id', 'name', 'phone', 'email', 'image'], // Kerakli attributlar
        }
      ],
      attributes: {
        exclude: ['category_id', 'user_id'], // category_id va user_id ni exclude qilamiz
      },
    });
  }

  // Fetch a single meal with Category and User info
  async findOne(id: number): Promise<Meal> {
    const meal = await this.mealModel.findByPk(id, {
      include: [
        { model: Categories }, // Category modelni qo'shish
        { model: User },       // User modelni qo'shish
      ],
    });
    if (!meal) {
      throw new NotFoundException(`Meal with id ${id} not found`);
    }
    return meal;
  }

  // Get meals by category ID
  async getMealsByCategory(categoryId: number): Promise<Meal[]> {
    return this.mealModel.findAll({
      where: { category_id: categoryId },
      include: [
        { model: Categories },
        { model: User },
      ],
    });
  }

  // Upload a meal image
  async uploadMealImage(payload: UploadMealImageRequest): Promise<void> {
    await this.#_checkUser(payload.mealId);

    let imageUrl: UploadFileResponse | null = null;

    if (payload.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }

    await this.mealModel.update(
      { image: imageUrl ? imageUrl.imageUrl : '' }, // Rasm URL
      { where: { id: payload.mealId } },
    );
  }

  // Remove a meal by ID
  async remove(id: number): Promise<void> {
    const meal = await this.findOne(id);
    await meal.destroy();
  }

  // Check if the user has access to the meal
  async #_checkUser(mealId: number): Promise<void> {
    const meal = await this.mealModel.findByPk(mealId);
    if (!meal) {
      throw new NotFoundException('Meal not found');
    }
  }
}
