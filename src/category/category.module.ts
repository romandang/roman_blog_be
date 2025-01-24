import { Module } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';

@Module({
  controllers: [CategoryController],
  providers: [CategoryService, StrapiService],
})
export class CategoryModule {}
