import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArticleService } from 'src/article/article.service';
import { CategoryService } from 'src/category/category.service';
import { ArticlePage } from 'src/nextjs/models/articlepage.model';
import { Homepage } from 'src/nextjs/models/homepage.model';
import { StrapiService } from 'src/strapi/strapi.service';
import { AboutUsPage } from './models/aboutpage.model';

@Injectable()
export class NextjsService {
  public homepage;
  public articlePage;
  public aboutUs;
  
  constructor(
    configService: ConfigService,
    articleService: ArticleService,
    categoryService: CategoryService,
    strapiService: StrapiService,
  ) {
    this.homepage = new Homepage(
      articleService,
      categoryService,
      configService,
    );

    this.articlePage = new ArticlePage(
      articleService,
      categoryService,
      configService,
    );
    this.aboutUs = new AboutUsPage(
      strapiService,
    );
  }

  async getDataHomepage() {
    const data = this.homepage.get();
    return data;
  }

  async getDataAboutUs() {
    const data = this.aboutUs.get();
    return data;
  }

  async getDataArticle() {
    const data = this.articlePage.get();
    return data;
  }
}
