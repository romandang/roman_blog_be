import { ApiProperty } from '@nestjs/swagger';

export interface ISignIn {
  username: string;
  password: string;
}

export class SignInDTO implements ISignIn {
  @ApiProperty({
    type: String,
  })
  username: string;

  @ApiProperty({
    type: String,
  })
  password: string;
}
