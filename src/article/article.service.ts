import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { StrapiService } from 'src/strapi/strapi.service';
import { ConfigService } from '@nestjs/config';
import {
  _,
  formatArticleResponse,
  formatCommentResponse,
  formatDate,
} from 'utils/helpers';
import { formatDateFromNow } from 'utils/helpers';
@Injectable()
export class ArticleService {
  private CMS_URL: string;

  constructor(
    private strapiService: StrapiService,
    private configService: ConfigService,
  ) {
    this.CMS_URL = this.configService.get('CMS_URL');
    this.CMS_URL = this.CMS_URL.replace('/api', '');
  }

  async getAllArticle(params) {
    try {
      const response = await this.strapiService.getAllArticle(params);
      return response.map(formatArticleResponse.bind(this, this.CMS_URL));
    } catch (error) {
      throw error;
    }
  }

  async getArticleById(id: string) {
    try {
      const response = await this.strapiService.getArticleById(id);
      return formatArticleResponse(response, this.CMS_URL);
    } catch (error) {
      throw error;
    }
  }

  async getArticleBySlug(slug: string) {
    try {
      const response = await this.strapiService.getArticleBySlug(slug);
      return formatArticleResponse(response, this.CMS_URL);
    } catch (error) {
      throw error;
    }
  }

  async getAllCommentByArticle(id) {
    try {
      const response = await this.strapiService.getAllCommentByArticle(id);
      const data = formatCommentResponse(response, this.CMS_URL);
      return data;
    } catch (error) {
      return error;
    }
  }

  async getFilterConfig() {
    try {
      const response = await this.strapiService.getFilterConfig();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
