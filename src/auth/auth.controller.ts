import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { customResponse } from 'src/common/common';
import { ERROR_MESSAGE, MESSAGE } from 'src/common/constants';
import { getUserIdFromJwt } from 'utils/helpers';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { get } from 'lodash/get';

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('/api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private jwtService: JwtService,
  ) {}

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
      const jwt = await this.jwtService.signAsync({
        ...createAuthDto,
        id: getUserIdFromJwt(response?.jwt),
      });

      const decodedToken = this.jwtService.decode(jwt);
      const expiredIn = decodedToken['exp'] * 1000;

      res.status(HttpStatus.OK);
      return res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: {
            access_token: jwt,
            expired_in: expiredIn
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

  @UseGuards(AuthGuard)
  @Get('/getUserInfo')
  async GetUserInfo(@Req() req: Request, @Res() res: Response) {
    try {
      const token = req.headers.authorization;

      if (!token) throw new UnauthorizedException('Unauthorize');

      const id = getUserIdFromJwt(token);
      const response = await this.authService.getUserInfo(id);
      const {
        email,
        authorName,
        firstName,
        lastName,
        alias,
        phoneNumber,
        avatar,
      } = response;
      res.status(HttpStatus.OK);
      return res.send(
        customResponse({
          statusCode: HttpStatus.OK,
          data: {
            email,
            authorName,
            firstName,
            lastName,
            alias,
            phoneNumber,
            avatar,
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
