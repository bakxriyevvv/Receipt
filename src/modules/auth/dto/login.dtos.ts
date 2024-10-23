import { IsEmail, IsNotEmpty, IsPhoneNumber } from 'class-validator';

export class LoginDto {
    
    email: string;
    phone: string;
}
