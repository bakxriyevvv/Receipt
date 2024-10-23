import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './models/product.model';
import { CreateProductDto } from './dto';
import { CreateProductRequest } from './interfaces';
import { UploadService,UploadFileResponse } from '../upload';
import { UploadProductImageRequest } from './interfaces/upload-product.image.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product)
    private readonly productModel: typeof Product,
    private uploadService: UploadService,
  ) {}

  async create(payload: CreateProductDto) {
    let imageUrl: null | UploadFileResponse = null;

    if (payload?.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }
    await this.productModel.create({
      name: payload.name,
      image: imageUrl? imageUrl?.imageUrl : '',
    });
  }

  async uploadUserImage(payload: UploadProductImageRequest): Promise<void> {
    // CHECK IF USER EXISTS
    await this.#_checkUser(payload.productId);

    const foundedUser = await this.productModel.findByPk(payload.productId);

    let imageUrl: null | UploadFileResponse = null;

    imageUrl = await this.uploadService.uploadFile({
      destination: 'uploads_product',
      file: payload.image,
    });

    await this.productModel.update(
      { image: imageUrl ? imageUrl?.imageUrl : '' },
      { where: { id: payload.productId } },
    );
  }


  async getAllUsers(): Promise<Product[]> {
    return await this.productModel.findAll();
  }

  async findOne(id: number) {
    const product = await this.productModel.findByPk(id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }


  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await product.destroy();
  }

  async #_checkUser(productId: number): Promise<void> {
    const user = await this.productModel.findByPk(productId);

    if (!user) {
      throw new Error('Product not found');
    }
  }
}
