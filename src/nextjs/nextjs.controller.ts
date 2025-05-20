import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { NextjsService } from './nextjs.service';
import { ApiTags } from '@nestjs/swagger';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { Response } from 'express';

@ApiTags('Nextjs pages')
@Controller('/api/pages')
export class NextjsController {
  constructor(private readonly nextjsService: NextjsService) {}

  @Get('/homepage')
  async getDataHomepage(@Res() res: Response) {
    try {
      const data = await this.nextjsService.getDataHomepage();
      res.status(HttpStatus.OK);
      return res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data,
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

  @Get('/article')
  async getDataArticle(@Res() res: Response) {
    try {
      const data = await this.nextjsService.getDataArticle();
      res.status(HttpStatus.OK);
      return res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data,
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
}
