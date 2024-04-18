import { Injectable } from '@nestjs/common';
import { SignInDTO } from './dto/sign-in.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { UpdateProfileDTO } from './dto/update-profile.dto';
import { JwtService } from '@nestjs/jwt';
import { API } from 'src/common/api';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private strapiService: StrapiService,
  ) {}

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
