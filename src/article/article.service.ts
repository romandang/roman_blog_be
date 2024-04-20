import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class ArticleService {
  constructor(private strapiService: StrapiService) {}

  async getAllArticle() {
    try {
      const response = await this.strapiService.getAllArticle();
      return response;
    } catch (error) {
      return error;
    }
  }

  async getArticleById(id) {
    try {
      const response = await this.strapiService.getArticleById(id);
      return response;
    } catch (error) {
      return error;
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
