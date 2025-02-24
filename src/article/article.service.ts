import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { StrapiService } from 'src/strapi/strapi.service';
import { ConfigService } from '@nestjs/config';
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
      const data = response.map((article) => {
        return {
          ...article,
          imageUrl: article.thumbnail?.url
            ? `${this.CMS_URL}${String(article.thumbnail?.url)}`
            : 'https://picsum.photos/1170/835',
          categoryName: article.categoryId?.name ?? 'Default',
          categoryUrl: article.categoryId?.slug ?? '/',
          datePublished: moment(article.publishedAt).format('MMMM D, YYYY'),
          pathAlias: article.slug ?? '/',
          createdDate: moment(article.publishedAt).fromNow(),
          authorUrl: article.author?.id ? `/${article.author?.id}` : '',
          authorName: article.author?.authorName ?? `Admin`,
          authorAvarta: article.author?.avatar?.url
            ? `${this.CMS_URL}${String(article.author?.avatar?.url)}`
            : 'https://picsum.photos/1170/835',
          timeReading: `${article.timeReading || 1} min to read`,
        };
      });
      return data;
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

  async getArticleBySlug(slug) {
    try {
      const response = await this.strapiService.getArticleBySlug(slug);
      return {
        ...response,
        imageUrl: response.thumbnail?.url
          ? `${this.CMS_URL}${String(response.thumbnail?.url)}`
          : 'https://picsum.photos/1170/835',
        categoryName: response.categoryId?.name ?? 'Default',
        categoryUrl: response.categoryId?.slug ?? '/',
        datePublished: moment(response.publishedAt).format('MMMM D, YYYY'),
        pathAlias: response.slug ?? '/',
        createdDate: moment(response.publishedAt).fromNow(),
        authorUrl: response.author?.id ? `/${response.author?.id}` : '',
        authorName: response.author?.authorName ?? `Admin`,
        authorAvarta: response.author?.avatar?.url
          ? `${this.CMS_URL}${String(response.author?.avatar?.url)}`
          : 'https://picsum.photos/1170/835',
        timeReading: `${response.timeReading || 1} min to read`,
        content: response.content,
      };
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

  async getFilterConfig() {
    try {
      const response = await this.strapiService.getFilterConfig();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
