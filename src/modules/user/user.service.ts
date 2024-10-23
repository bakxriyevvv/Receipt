import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models';
import { CreateUserDto } from './dto';
import { CreateUserRequest } from './interfaces';
import { UserRoles } from './models';
import { UploadService } from '../upload';
import { UploadFileResponse } from '../upload';
import { UploadUserImageRequest } from './interfaces';


@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private uploadService: UploadService,
  ) {}

  async create(payload: CreateUserRequest) {
    let imageUrl: null | UploadFileResponse = null;

    if (payload?.image) {
      imageUrl = await this.uploadService.uploadFile({
        destination: 'uploads',
        file: payload.image,
      });
    }
    await this.userModel.create({
      name: payload.name,
      phone: payload.phone,
      password: payload.password,
      telegram_id: payload.telegram_id,
      email: payload.email,
      image: imageUrl? imageUrl?.imageUrl : '',
      role: payload?.role? payload.role : UserRoles.user
    });
  }

  async uploadUserImage(payload: UploadUserImageRequest): Promise<void> {
    // CHECK IF USER EXISTS
    await this.#_checkUser(payload.userId);

    const foundedUser = await this.userModel.findByPk(payload.userId);

    let imageUrl: null | UploadFileResponse = null;

    imageUrl = await this.uploadService.uploadFile({
      destination: 'uploads',
      file: payload.image,
    });

    await this.userModel.update(
      { image: imageUrl ? imageUrl?.imageUrl : '' },
      { where: { id: payload.userId } },
    );
  }


  async getAllUsers(): Promise<User[]> {
    return await this.userModel.findAll();
  }
  async getAllUser(): Promise<User[]> {
    return await this.userModel.findAll();
  }

  async remove(Id: number): Promise<void> {
    const foundedUser = await this.userModel.findByPk(Id);

    if (foundedUser?.image) {
      await this.uploadService.removeFile({ fileName: foundedUser.image });
    }

    await this.userModel.destroy({ where: { id: Id } });
  }

  async #_checkUser(userId: number): Promise<void> {
    const user = await this.userModel.findByPk(userId);

    if (!user) {
      throw new Error('User not found');
    }
  }
}
