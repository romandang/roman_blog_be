import { Controller, Get, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Article')
@Controller('/api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get('/getAllArticle')
  getAllArticle() {
    return this.articleService.getAllArticle();
  }

  @Get('/getArticleById/:id')
  getArticleById(@Param('id') id: string) {
    return this.articleService.getArticleById(id);
  }

  @Get('/getAllCommentByArticle/:id')
  getAllCommentByArticle(@Param('id') id: string) {
    return this.articleService.getAllCommentByArticle(id);
  }
}
