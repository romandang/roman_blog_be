import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { getUserIdFromJwt } from 'utils/helpers';
import { CommentInteractiveDto } from './dto/comment-interactive.dto';
import { InteractiveService } from './interactive.service';
import { LikeInteractiveDto } from './dto/like-interactive.dto';
import { ViewInteractiveDto } from './dto/view-interactive.dto';
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

  @Post('/view')
  view(@Body() viewInteractiveDto: ViewInteractiveDto) {
    return this.interactiveService.view(viewInteractiveDto);
  }

  @Post('/like')
  like(@Req() req: Request, @Body() likeInteractiveDto: LikeInteractiveDto) {
    const jwt = req.headers.authorization.replace('Bearer ', '');
    const id = getUserIdFromJwt(jwt);
    return this.interactiveService.like(id, likeInteractiveDto);
  }
}
