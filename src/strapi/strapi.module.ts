import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { StrapiService } from './strapi.service';

@Module({
  imports: [ConfigModule],
  providers: [StrapiService],
})
export class StrapiModule {}
