import { Injectable } from '@nestjs/common';
import { CommentInteractiveDto } from './dto/comment-interactive.dto copy';
import { StrapiService } from 'src/strapi/strapi.service';

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
}
