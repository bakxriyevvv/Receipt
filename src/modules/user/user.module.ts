import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models'; // User modelini import qilish
import { UserService } from './user.service'; // User service
import { UserController } from './user.controller'; // User controller
import { UploadService } from '../upload/upload.service';

@Module({
  imports: [SequelizeModule.forFeature([User])], // User modeli uchun Sequelize moduli
  controllers: [UserController], // User controller
  providers: [UserService, UploadService],
  exports: [UserService], // Agar boshqa modullarda ham foydalanilsa
})
export class UserModule {}
