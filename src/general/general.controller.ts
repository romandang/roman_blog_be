import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GeneralService } from './general.service';
import { Response } from 'express';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE } from 'src/common/constants';

@ApiTags('General')
@Controller('/api/general')
export class GeneralController {
  constructor(private readonly generalService: GeneralService) {}

  @Get('/getFooter')
  async getFooter(@Res() res: Response) { 
    try {
      const response = await this.generalService.getFooter(); 
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: response,
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
