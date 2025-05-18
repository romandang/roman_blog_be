import { ApiProperty } from '@nestjs/swagger';

export class ReplyCommentInteractiveDto {
  @ApiProperty({
    type: String,
  })
  articleId: string;

  @ApiProperty({
    type: String,
  })
  parentId: string;

  @ApiProperty({
    type: String,
  })
  comment: string;
}
