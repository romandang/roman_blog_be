import { ApiProperty } from '@nestjs/swagger';

export class ViewInteractiveDto {
  @ApiProperty({
    type: String,
  })
  articleId: string;
}
