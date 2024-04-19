import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { StrapiService } from 'src/strapi/strapi.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, StrapiService],
})
export class CategoryModule {}
