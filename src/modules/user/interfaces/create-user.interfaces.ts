import { UserRoles } from "../models";

export declare interface CreateUserRequest {
  id: number;
  name: string;
  phone: string;
  password: string;
  email: string;
  telegram_id?: string;
  image?: Express.Multer.File;
  role?: UserRoles;
}
