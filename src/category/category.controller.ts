import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryService } from './category.service';
import { Response } from 'express';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE } from 'src/common/constants';

@ApiTags('Category')
@Controller('/api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get('/getAllCategory')
  async getAllCategory(@Res() res: Response) {
    try {
      const response = await this.categoryService.getAllCategory();
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: response.data,
        }),
      );
    } catch (error) {
      res.status(error.status);
      res.send(
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
