import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class ArticleService {
  constructor(private strapiService: StrapiService) {}

  async getAllArticle(params) {
    try {
      const response = await this.strapiService.getAllArticle(params);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getArticleById(id) {
    try {
      const response = await this.strapiService.getArticleById(id);
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllCommentByArticle(id) {
    try {
      const response = await this.strapiService.getAllCommentByArticle(id);
      return response;
    } catch (error) {
      return error;
    }
  }
}
