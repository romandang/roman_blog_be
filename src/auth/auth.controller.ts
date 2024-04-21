import {
  Body,
  Controller,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE, MESSAGE } from 'src/common/constants';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  async SignUp(@Body() createAuthDto: SignUpDTO, @Res() res: Response) {
    try {
      await this.authService.signUp(createAuthDto);
      res.status(HttpStatus.CREATED);
      return res.send(
        customResponse({
          statusCode: HttpStatus.CREATED,
          message: MESSAGE.AUTH.REGISTER_SUCCESS,
        }),
      );
    } catch (error) {
      res.status(error.status);
      return res.send(
        customResponse({
          statusCode: error.status,
          message: ERROR_MESSAGE.AUTH.REGISTER_FAIL,
        }),
      );
    }
  }

  @Post('/signIn')
  async SignIn(@Body() createAuthDto: SignInDTO, @Res() res: Response) {
    try {
      const response = await this.authService.signIn(createAuthDto);
      res.status(HttpStatus.OK);
      return res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: {
            access_token: response?.jwt,
          },
        }),
      );
    } catch (error) {
      res.status(error.status);
      return res.send(
        customResponse({
          statusCode: error.status,
          message: ERROR_MESSAGE.AUTH.LOGIN_FAIL,
        }),
      );
    }
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Put('/updateProfile/:id')
  async UpdateProfile(
    @Param('id') id,
    @Body() createAuthDto: UpdateProfileDTO,
    @Res() res: Response,
  ) {
    try {
      await this.authService.updateProfile(id, createAuthDto);
      res.status(HttpStatus.OK);
      res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          message: MESSAGE.AUTH.UPDATE_PROFILE_SUCCESS,
        }),
      );
    } catch (error) {
      res.status(error.status);
      res.send(
        customResponse({
          statusCode: error.status,
          message: ERROR_MESSAGE.AUTH.UPDATE_PROFILE_FAIL,
        }),
      );
    }
  }
}
