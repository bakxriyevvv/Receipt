import { IsNotEmpty, IsString, IsEmail ,IsOptional,IsEnum} from 'class-validator';
import { CreateUserRequest } from '../interfaces';
import { UserRoles } from '../models';

export class CreateUserDto implements Omit<CreateUserRequest, 'image'> {

  id: number;
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  image?: any;

  @IsOptional()
  @IsString()
  telegram_id?: string;

  @IsOptional()
  @IsEnum(UserRoles)
  role: UserRoles;
}
