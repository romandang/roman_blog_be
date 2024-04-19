import { Body, Controller, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getUserIdFromJwt } from 'utils/helpers';
import { CommentInteractiveDto } from './dto/comment-interactive.dto copy';
import { InteractiveService } from './interactive.service';
@ApiTags('Interactive')
@ApiBearerAuth('JWT-auth')
@Controller('/api/interactive')
export class InteractiveController {
  constructor(private readonly interactiveService: InteractiveService) {}

  @Post('/comment')
  comment(
    @Req() req: Request,
    @Body() commentInteractiveDto: CommentInteractiveDto,
  ) {
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const id = getUserIdFromJwt(jwt);
    return this.interactiveService.comment(id, commentInteractiveDto);
  }
}
