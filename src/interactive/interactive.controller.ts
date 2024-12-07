import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { getUserIdFromJwt } from 'utils/helpers';
import { CommentInteractiveDto } from './dto/comment-interactive.dto';
import { LikeInteractiveDto } from './dto/like-interactive.dto';
import { ViewInteractiveDto } from './dto/view-interactive.dto';
import { InteractiveService } from './interactive.service';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE, MESSAGE } from 'src/common/constants';
@ApiTags('Interactive')
@ApiBearerAuth('JWT-auth')
@Controller('/api/interactive')
export class InteractiveController {
  constructor(private readonly interactiveService: InteractiveService) { }

  @Post('/comment')
  async comment(
    @Req() req: Request,
    @Body() commentInteractiveDto: CommentInteractiveDto,
    @Res() res: Response,
  ) {
    try {
      if (!req.headers.authorization)
        throw new HttpException('Unauthorize', HttpStatus.UNAUTHORIZED);

      const jwt = req.headers.authorization.replace('Bearer ', '');
      const id = getUserIdFromJwt(jwt);
      await this.interactiveService.comment(id, commentInteractiveDto);
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          message: MESSAGE.INTERACTIVE.COMMENT_SENT,
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

  @Post('/view')
  async view(
    @Body() viewInteractiveDto: ViewInteractiveDto,
    @Res() res: Response,
  ) {
    try {
      const data = await this.interactiveService.view(viewInteractiveDto);
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data,
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

  @Post('/like')
  async like(
    @Req() req: Request,
    @Body() likeInteractiveDto: LikeInteractiveDto,
    @Res() res: Response,
  ) {
    try {
      if (!req.headers.authorization)
        throw new HttpException('Unauthorize', HttpStatus.UNAUTHORIZED);

      const jwt = req.headers.authorization.replace('Bearer ', '');
      const id = getUserIdFromJwt(jwt);
      await this.interactiveService.like(id, likeInteractiveDto);
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          message: MESSAGE.INTERACTIVE.ACTION_SENT,
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
