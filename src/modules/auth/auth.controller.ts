import { Body, Controller, Post, Render, Get, HttpException, HttpStatus, ValidationPipe,Res,UsePipes, HttpCode} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { LoginResponse, RefreshResponse, RegisterResponse } from './interfaces';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto, RefreshDto, RegisterDto } from './dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  #_service: AuthService;

  constructor(service: AuthService) {
    this.#_service = service;
  }

  @ApiOperation({ summary: 'Login qilish' })
  @Post('/login')
  @UsePipes(new ValidationPipe())
  async signIn(@Body() payload: LoginDto, @Res() response: Response): Promise<any> {
      try {
          const loginResponse = await this.#_service.login(payload);
          if (loginResponse) {
              return response.status(HttpStatus.OK).json({
                  success: true,
                  profileImage: loginResponse.photo,
                  username: loginResponse.name,
                  accessToken: loginResponse.accessToken,
                  refreshToken: loginResponse.refreshToken,
              });
          } else {
              return response.status(HttpStatus.UNAUTHORIZED).json({
                  success: false,
                  message: 'Foydalanuvchi topilmadi',
              });
          }
      } catch (error) {
          return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
              success: false,
              message: 'Serverda xatolik yuz berdi: ' + error.message,
          });
      }
  }
  
  


  @ApiOperation({ summary: 'Register qilish' })
  @Post('/register')
  async signUp(
    @Body(new ValidationPipe()) payload: RegisterDto,
    @Res() response: Response
  ): Promise<void> { // Faqat void qaytaradi, chunki sahifa rendering qilinadi
    try {
      // Foydalanuvchini ro'yxatdan o'tkazish
      const newUser = await this.#_service.register(payload);
  
      // Agar ro'yxatdan o'tish muvaffaqiyatli bo'lsa, sahifani render qilish
      if (newUser) {
        response.render('register.ejs', {
          user: newUser,
          message: 'Muvaffaqiyatli royxatdan otdingiz!',
          title: 'Register',
        });
      } else {
        // Agar foydalanuvchi yaratilmadi, xato xabari ko'rsatish
        response.render('register.ejs', {
          user: {},
          message: 'Royxatdan otishda xato yuz berdi.',
          title: 'Register',
        });
      }
    } catch (error) {
      throw new HttpException('Royxatdan otishda xato: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }
  
  
  @Get('/register')
  @Render('register.ejs')
  async showRegisterForm() {
    return { user: {}, message: '', title: 'Register' };
}


  @ApiOperation({ summary: 'Refresh tokenni yangilash' })
  @Post('/refresh')
  async refresh(@Body(new ValidationPipe()) payload: RefreshDto): Promise<RefreshResponse> {
    try {
      return await this.#_service.refresh(payload);
    } catch (error) {
      throw new HttpException('Tokenni yangilashda xato: ' + error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/login') // Login sahifasini ko'rsatish
  @Render('login') // views/login/index.ejs faylini render qilish
  login() {
    return { user: {}, message: '', title: 'Login' };
  }

}
