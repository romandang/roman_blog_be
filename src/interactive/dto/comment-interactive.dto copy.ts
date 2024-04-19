import { ApiProperty } from '@nestjs/swagger';

export class CommentInteractiveDto {
  @ApiProperty({
    type: String,
  })
  idArticle: string;

  @ApiProperty({
    type: String,
  })
  comment: string;
}
