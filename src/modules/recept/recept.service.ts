import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Receipt } from './models';
import { CreateReceiptDto, UpdateReceiptDto } from './dto';
import { Receipt as ReceiptInterface } from './interfaces';
import { Product } from '../product';
import { Meal } from '../meal';
import { Categories } from '../categories';
import { User } from '../user';

@Injectable()
export class ReceiptService {
  constructor(
    @InjectModel(Receipt)
    private readonly receiptModel: typeof Receipt,
  ) {}

  async create(createReceiptDto: CreateReceiptDto) {
    return await this.receiptModel.create(createReceiptDto);
  }

  async findAll(): Promise<ReceiptInterface[]> {
    return await this.receiptModel.findAll({
      include: [
        { 
          model: Product, 
        },
        {
          model: Meal,
          include: [Categories, User], // Meal ichidagi Category va User ma'lumotlarini ham olish
        },
      ],
    });
  }


  async findOne(id: number) {
    const receipt = await this.receiptModel.findByPk(id,{
        include: [
          { 
            model: Product, 
          },
          {
            model: Meal,
            include: [Categories, User], // Meal ichidagi Category va User ma'lumotlarini ham olish
          },
        ],
      });
    if (!receipt) {
      throw new NotFoundException(`Receipt with id ${id} not found`);
    }
    return receipt;
  }

  async update(id: number, updateReceiptDto: UpdateReceiptDto) {
    const receipt = await this.findOne(id);
    return await receipt.update(updateReceiptDto);
  }

  async remove(id: number): Promise<void> {
    const receipt = await this.findOne(id);
    await receipt.destroy();
  }
}
