import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { RegisterRequest } from '../interfaces';

export class RegisterDto implements RegisterRequest{
    @IsNotEmpty({ message: 'name should not be empty' })
    @IsString({ message: 'name must be a string' })
    name: string;

    @IsNotEmpty({ message: 'email should not be empty' })
    @IsEmail({}, { message: 'email must be an email' })
    email: string;

    @IsNotEmpty()
    @IsPhoneNumber(null, { message: 'phone must be a valid phone number' })
    phone: string;

    @IsNotEmpty({ message: 'password should not be empty' })
    @IsString({ message: 'password must be a string' })
    password: string;
}
