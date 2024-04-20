import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { CommentInteractiveDto } from './dto/comment-interactive.dto';
import { ViewInteractiveDto } from './dto/view-interactive.dto';
import { LikeInteractiveDto } from './dto/like-interactive.dto';

@Injectable()
export class InteractiveService {
  constructor(private strapiService: StrapiService) {}
  async comment(id: string, commentInteractiveDto: CommentInteractiveDto) {
    try {
      const response = await this.strapiService.comment(
        id,
        commentInteractiveDto,
      );
      return response;
    } catch (error) {
      return error;
    }
  }

  async view(viewInteractiveDto: ViewInteractiveDto) {
    try {
      const response = await this.strapiService.view(viewInteractiveDto);
      return response;
    } catch (error) {
      return error;
    }
  }

  async like(id: string, likeInteractiveDto: LikeInteractiveDto) {
    try {
      const response = await this.strapiService.like(id, likeInteractiveDto);
      return response;
    } catch (error) {
      return error;
    }
  }
}
