import { ApiProperty } from '@nestjs/swagger';

export class LikeInteractiveDto {
  @ApiProperty({
    type: String,
  })
  articleId: string;
}
