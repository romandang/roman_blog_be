import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArticleService } from 'src/article/article.service';
import { CategoryService } from 'src/category/category.service';
import { ArticlePage } from './models/articlePage.model';
import { Homepage } from './models/homepage.model';

@Injectable()
export class NextjsService {
  public homepage;
  public articlePage;

  constructor(
    configService: ConfigService,
    articleService: ArticleService,
    categoryService: CategoryService,
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
  }

  async getDataHomepage() {
    const data = this.homepage.get();
    return data;
  }

  async getDataArticle() {
    const data = this.articlePage.get();
    return data;
  }
}
