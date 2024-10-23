import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { appConfig, dbConfig, jwtConfig } from './config';
import { Categories, CategoriesModule, Meal, MealModule, Product, ProductModule, Receipt, ReceiptModule, User, UserModule } from './modules';
import { AuthModule } from './modules/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { ServeStaticModule } from '@nestjs/serve-static';
import { AppController } from './app.controller';
import { join } from 'path';
// import { HomeModule } from './modules/home/home.module';

@Module({
  controllers: [AppController],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, dbConfig, jwtConfig],
    }),  
    JwtModule.register({
      secret: 'my secret',
      global: true,
      signOptions: {
        expiresIn: 60 * 15,
      },
    }),
    ServeStaticModule.forRoot({
      
      rootPath: join(__dirname, '..', 'frontend', 'views'),
      serveRoot: '/views'
    }),
    ServeStaticModule.forRoot({
      
      rootPath: join(__dirname, '..', 'frontend', 'js'),
      serveRoot: '/js'
    }),
    ServeStaticModule.forRoot({
      
        rootPath: join(__dirname, '..', 'uploads'), // Upload fayllar joylashgan yo'l
        serveRoot: '/api/v1/uploads/', // URL prefiksi
}),
    
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [User, Categories, Meal, Product, Receipt],
      synchronize: true,
      // sync: {force: true},
      autoLoadModels: true,
    }),
    // HomeModule, 
    UserModule,
    ProductModule,
    ReceiptModule,
    MealModule,
    CategoriesModule,
    AuthModule,
  ],
})
export class AppModule {}
