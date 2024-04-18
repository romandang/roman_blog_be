import { Body, Controller, Param, Patch, Post, Put } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@ApiTags('Auth')
@Controller('/api/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signUp')
  SignUp(@Body() createAuthDto: SignUpDTO) {
    return this.authService.signUp(createAuthDto);
  }

  @Post('/signIn')
  SignIn(@Body() createAuthDto: SignInDTO) {
    return this.authService.signIn(createAuthDto);
  }

  @ApiParam({
    name: 'id',
    required: true,
  })
  @Put('/updateProfile/:id')
  UpdateProfile(@Param('id') id, @Body() createAuthDto: UpdateProfileDTO) {
    return this.authService.updateProfile(id, createAuthDto);
  }
}
