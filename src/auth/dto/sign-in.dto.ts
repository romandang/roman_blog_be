import { ApiProperty } from '@nestjs/swagger';

export interface ISignIn {
  identifier: string;
  password: string;
}

export class SignInDTO implements ISignIn {
  @ApiProperty({
    type: String,
  })
  identifier: string;

  @ApiProperty({
    type: String,
  })
  password: string;
}
