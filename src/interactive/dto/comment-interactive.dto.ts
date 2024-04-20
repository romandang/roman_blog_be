import { ApiProperty } from '@nestjs/swagger';

export class CommentInteractiveDto {
  @ApiProperty({
    type: String,
  })
  articleId: string;

  @ApiProperty({
    type: String,
  })
  comment: string;
}
