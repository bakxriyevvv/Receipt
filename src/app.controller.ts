import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('main')
  @Render('index.ejs')
  root() {
    return { message: 'Hello world!' };
  }
}