import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { METHOD } from 'src/common/constants';

type API = {
  ARTICLE: {
    GET_ALL_ARTICLE: string;
  };
  USER: {
    SIGN_UP: string;
    SIGN_IN: string;
    UPDATE_PROFILE: string;
  };
};

@Injectable()
export class StrapiService {
  private CMS_URL = '';
  private CMS_ADMIN_TOKEN = '';
  private API: API;

  constructor(private configService: ConfigService) {
    this.CMS_URL = this.configService.get<string>('CMS_URL');
    this.CMS_ADMIN_TOKEN = this.configService.get<string>('CMS_ADMIN_TOKEN');
    this.API = {
      ARTICLE: {
        GET_ALL_ARTICLE: `${this.CMS_URL}/articles`,
      },
      USER: {
        SIGN_UP: `${this.CMS_URL}/auth/local/register`,
        SIGN_IN: `${this.CMS_URL}/auth/local`,
        UPDATE_PROFILE: `${this.CMS_URL}/users`,
      },
    };
  }

  private async fetchData(url, params) {
    const data = await fetch(url, {
      headers: {
        Authorization: `Bearer ${this.CMS_ADMIN_TOKEN}`,
        'Content-Type': 'application/json',
      },
      ...params,
    });
    return data.json();
  }

  async signUp(data) {
    try {
      const response = await this.fetchData(this.API.USER.SIGN_UP, {
        method: METHOD.POST,
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async signIn(data) {
    try {
      const response = await this.fetchData(this.API.USER.SIGN_IN, {
        method: METHOD.POST,
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProfile(userId, data) {
    try {
      const response = await this.fetchData(
        `${this.API.USER.UPDATE_PROFILE}/${userId}`,
        {
          method: METHOD.PUT,
          body: JSON.stringify(data),
        },
      );
      return response;
    } catch (error) {
      console.log(error);
    }
  }

  async getAllArticle() {
    try {
      const response = await this.fetchData(this.API.ARTICLE.GET_ALL_ARTICLE, {
        method: METHOD.GET,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}
