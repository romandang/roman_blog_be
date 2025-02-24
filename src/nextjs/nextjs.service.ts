import { ConfigService } from '@nestjs/config';
import { ArticleService } from 'src/article/article.service';
import { CategoryService } from 'src/category/category.service';
import { UpdateNextjDto } from './dto/update-nextj.dto';
import { Homepage } from './models/homepage.model';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NextjsService {
  public homepage;
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
  }

  async getDataHomepage() {
    const data = this.homepage.get();
    return data;
  }

  async getDataArticle() {
    return {
      mostPopularArticle: {},
      dataFilter: {
        category: {},
        sortBy: {},
        orderDate: {},
      },
    };
  }
}
