import { Controller, Get, HttpStatus, Param, Query, Res } from '@nestjs/common';
import { ApiQuery, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { SortBy } from 'src/common/types';
import { ArticleService } from './article.service';
import { ARTICLE_FILTER } from './constants/query';

@ApiTags('Article')
@Controller('/api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @ApiQuery({
    name: ARTICLE_FILTER.SORT_BY,
    enum: SortBy,
  })
  @ApiQuery({
    name: ARTICLE_FILTER.CATEGORY,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: ARTICLE_FILTER.USER_ID,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: ARTICLE_FILTER.PAGE,
    type: String,
    required: false,
  })
  @ApiQuery({
    name: ARTICLE_FILTER.ITEMS_PER_PAGE,
    type: String,
    required: false,
  })
  @Get('/getAllArticle')
  async getAllArticle(
    @Query(ARTICLE_FILTER.SORT_BY) sortBy: SortBy,
    @Query(ARTICLE_FILTER.CATEGORY) category: string,
    @Query(ARTICLE_FILTER.USER_ID) userId: string,
    @Query(ARTICLE_FILTER.PAGE) page: string,
    @Query(ARTICLE_FILTER.ITEMS_PER_PAGE) itemPerPage: string,
    @Res() res: Response,
  ) {
    try {
      const response = await this.articleService.getAllArticle({
        sort_by: sortBy,
        category,
        userId,
        page,
        items_per_page: itemPerPage
      });
      res.status(HttpStatus.OK);
      return res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: response,
        }),
      );
    } catch (error) {
      res.status(error.status || 500);
      return res.send(
        customResponse({
          statusCode: error.status,
          message:
            error.status === HttpStatus.BAD_REQUEST
              ? ERROR_MESSAGE.GENERAL.INVALID_REQUEST
              : ERROR_MESSAGE.GENERAL.OTHER,
        }),
      );
    }
  }

  @Get('/getArticleById/:id')
  async getArticleById(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.articleService.getArticleById(id);
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: response.data,
        }),
      );
    } catch (error) {
      res.status(error.status);
      return res.send(
        customResponse({
          statusCode: error.status,
          message:
            error.status === HttpStatus.BAD_REQUEST
              ? ERROR_MESSAGE.GENERAL.INVALID_REQUEST
              : ERROR_MESSAGE.GENERAL.OTHER,
        }),
      );
    }
  }

  @Get('/getAllCommentByArticle/:id')
  async getAllCommentByArticle(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.articleService.getAllCommentByArticle(id);
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: response.data,
        }),
      );
    } catch (error) {
      res.status(error.status);
      return res.send(
        customResponse({
          statusCode: error.status,
          message:
            error.status === HttpStatus.BAD_REQUEST
              ? ERROR_MESSAGE.GENERAL.INVALID_REQUEST
              : ERROR_MESSAGE.GENERAL.OTHER,
        }),
      );
    }
  }
}
