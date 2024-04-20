import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';

@Injectable()
export class AuthService {
  constructor(private strapiService: StrapiService) {}

  async signIn(signInDto: SignInDTO) {
    const data = await this.strapiService.signIn(signInDto);
    return data;
  }

  async signUp(signUpDto: SignUpDTO) {
    const data = await this.strapiService.signUp(signUpDto);
    return data;
  }

  async updateProfile(id: string, updateProfileDto: UpdateProfileDTO) {
    const data = await this.strapiService.updateProfile(id, updateProfileDto);
    return data;
  }
}
