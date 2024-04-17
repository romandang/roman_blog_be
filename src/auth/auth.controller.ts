import { Body, Controller, Patch, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
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

  @Patch('/updateProfile')
  UpdateProfile(@Body() createAuthDto: UpdateProfileDTO) {
    return this.authService.updateProfile(createAuthDto);
  }
}
