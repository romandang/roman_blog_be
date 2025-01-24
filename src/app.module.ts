import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ArticleModule } from './article/article.module';
import { CategoryModule } from './category/category.module';
import { InteractiveModule } from './interactive/interactive.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { NextjsModule } from './nextjs/nextjs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ArticleModule,
    CategoryModule,
    InteractiveModule,
    NextjsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
