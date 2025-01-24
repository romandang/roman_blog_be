import { Module } from '@nestjs/common';
import { NextjsService } from './nextjs.service';
import { NextjsController } from './nextjs.controller';
import { ArticleService } from 'src/article/article.service';
import { StrapiService } from 'src/strapi/strapi.service';
import { ConfigModule } from '@nestjs/config';
import { CategoryService } from 'src/category/category.service';

@Module({
  imports: [ConfigModule],
  controllers: [NextjsController],
  providers: [NextjsService, StrapiService, ArticleService, CategoryService],
})
export class NextjsModule {}
