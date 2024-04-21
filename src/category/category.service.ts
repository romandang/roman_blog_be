import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class CategoryService {
  constructor(private strapiService: StrapiService) {}

  async getAllCategory() {
    try {
      const response = await this.strapiService.getAllCategory();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
