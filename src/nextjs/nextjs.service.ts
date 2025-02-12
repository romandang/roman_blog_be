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

  findAll() {
    return `This action returns all nextjs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nextj`;
  }

  update(id: number, updateNextjDto: UpdateNextjDto) {
    return `This action updates a #${id} nextj`;
  }

  remove(id: number) {
    return `This action removes a #${id} nextj`;
  }
}
