import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { CommentInteractiveDto } from './dto/comment-interactive.dto';
import { ViewInteractiveDto } from './dto/view-interactive.dto';
import { LikeInteractiveDto } from './dto/like-interactive.dto';
import { _, formatCommentResponse } from 'utils/helpers';
import { formatDateFromNow } from 'utils/helpers';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class InteractiveService {
  private CMS_URL: string;

  constructor(
    private strapiService: StrapiService,
    private configService: ConfigService,
  ) {
    this.CMS_URL = this.configService.get('CMS_URL');
    this.CMS_URL = this.CMS_URL.replace('/api', '');
  }
  async comment(id: string, commentInteractiveDto: CommentInteractiveDto) {
    try {
      const response = await this.strapiService.comment(
        id,
        commentInteractiveDto,
      );

      const data = formatCommentResponse(response?.data, this.CMS_URL);
      return { ...response, data };
    } catch (error) {
      return error;
    }
  }

  async view(viewInteractiveDto: ViewInteractiveDto) {
    try {
      const response = await this.strapiService.view(viewInteractiveDto);
      return response;
    } catch (error) {
      throw error;
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
