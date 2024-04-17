import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class StrapiService {
  private CMS_URL = '';
  private CMS_ADMIN_TOKEN = '';
  private API: any = {};

  constructor(private configService: ConfigService) {
    this.CMS_URL = this.configService.get<string>('CMS_URL');
    this.CMS_ADMIN_TOKEN = this.configService.get<string>('CMS_ADMIN_TOKEN');
    this.API = {
      ARTICLE: {
        GET_ALL_ARTICLE: `${this.CMS_URL}/articles`,
      },
    };
  }

  private async fetchData(url, params) {
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.CMS_ADMIN_TOKEN}`,
      },
      ...params,
    });
    return data.json();
  }

  async getAllArticle() {
    try {
      const data = await this.fetchData(this.API.ARTICLE.GET_ALL_ARTICLE, {
        method: 'GET',
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
