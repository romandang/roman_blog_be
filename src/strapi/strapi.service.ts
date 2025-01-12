import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { METHOD } from 'src/common/constants';
import { omitBy, isNil } from 'lodash'
const qs = require('qs');

type API = {
  ARTICLE: {
    GET_ALL_ARTICLE: string;
    GET_ALL_COMMENT_BY_ARTICLE: string;
  };
  USER: {
    SIGN_UP: string;
    SIGN_IN: string;
    UPDATE_PROFILE: string;
    GET_USER_INFO: string
  };
  CATEGORY: {
    GET_ALL_CATEGORY: string;
  };
  INTERACTIVE: {
    COMMENT: string;
    LIKE: string;
    VIEW: string;
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
        GET_ALL_ARTICLE: `${this.CMS_URL}/custom-article/getTopArticle`,
        GET_ALL_COMMENT_BY_ARTICLE: `${this.CMS_URL}/commentings?populate=userId&filters[articleId][id][$eq]`,
      },
      USER: {
        SIGN_UP: `${this.CMS_URL}/auth/local/register`,
        SIGN_IN: `${this.CMS_URL}/auth/local`,
        UPDATE_PROFILE: `${this.CMS_URL}/users`,
        GET_USER_INFO: `${this.CMS_URL}/users`,
      },
      CATEGORY: {
        GET_ALL_CATEGORY: `${this.CMS_URL}/categories`,
      },
      INTERACTIVE: {
        COMMENT: `${this.CMS_URL}/custom-article/comment`,
        LIKE: `${this.CMS_URL}/custom-article/like`,
        VIEW: `${this.CMS_URL}/custom-article/view`,
      },
    };
  }

  private async fetchData(url, params) {
    try {
      const data = await fetch(url, {
        headers: {
          Authorization: `Bearer ${this.CMS_ADMIN_TOKEN}`,
          'Content-Type': 'application/json',
        },
        ...params,
      });
      switch (data.status) {
        case 400:
          throw new HttpException('error', HttpStatus.BAD_REQUEST);

        default:
          break;
      }

      return data.json();
    } catch (error) {
      throw error;
    }
  }

  async signUp(data) {
    try {
      const response = await this.fetchData(this.API.USER.SIGN_UP, {
        method: METHOD.POST,
        body: JSON.stringify(data),
      });
      return response;
    } catch (error) {
      throw error;
    }   
  }

  async signIn(data) {
    try {
      const response = await this.fetchData(this.API.USER.SIGN_IN, {
        method: METHOD.POST,
        body: JSON.stringify({
          identifier: data.username,
          password: data.password
        }),
      });
      return response;
    } catch (error) {
      throw error;
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
      throw error;
    }
  }

  async getUserInfo(userId) {
    try {
      const response = await this.fetchData(
        `${this.API.USER.GET_USER_INFO}/${userId}?&populate[0]=avatar`,
{method:METHOD.GET}
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllArticle(params) {
    const queryString = new URLSearchParams(omitBy(params, isNil));
    try {
      const response = await this.fetchData(
        `${this.API.ARTICLE.GET_ALL_ARTICLE}?${queryString}`,
        {
          method: METHOD.GET,
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getArticleById(id) {
    try {
      const response = await this.fetchData(
        `${this.API.ARTICLE.GET_ALL_ARTICLE}/${id}`,
        {
          method: METHOD.GET,
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllCategory() {
    try {
      const response = await this.fetchData(
        `${this.API.CATEGORY.GET_ALL_CATEGORY}`,
        {
          method: METHOD.GET,
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }

  async comment(id, data) {
    try {
      const response = await this.fetchData(`${this.API.INTERACTIVE.COMMENT}`, {
        method: METHOD.POST,
        body: JSON.stringify({
          data: {
            userId: id,
            ...data,
          },
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async view(data) {
    try {
      const response = await this.fetchData(`${this.API.INTERACTIVE.VIEW}`, {
        method: METHOD.POST,
        body: JSON.stringify({
          data,
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async like(id, data) {
    try {
      const response = await this.fetchData(`${this.API.INTERACTIVE.LIKE}`, {
        method: METHOD.POST,
        body: JSON.stringify({
          data: {
            userId: id,
            ...data,
          },
        }),
      });
      return response;
    } catch (error) {
      throw error;
    }
  }

  async getAllCommentByArticle(id) {
    try {
      const response = await this.fetchData(
        `${this.API.ARTICLE.GET_ALL_COMMENT_BY_ARTICLE}=${id}`,
        {
          method: METHOD.GET,
        },
      );
      return response;
    } catch (error) {
      throw error;
    }
  }
}
