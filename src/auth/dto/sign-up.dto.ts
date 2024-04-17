import { ApiProperty } from '@nestjs/swagger';

export interface ISignUp {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
  phoneNumber: string;
  userPicture: string;
}

export class SignUpDTO implements ISignUp {
  @ApiProperty({
    type: String,
  })
  firstName: string;

  @ApiProperty({
    type: String,
  })
  lastName: string;
  @ApiProperty({
    type: String,
  })
  email: string;

  @ApiProperty({
    type: String,
  })
  username: string;

  @ApiProperty({
    type: String,
  })
  password: string;

  @ApiProperty({
    type: String,
  })
  phoneNumber: string;

  @ApiProperty({
    type: String,
  })
  userPicture: string;
}
