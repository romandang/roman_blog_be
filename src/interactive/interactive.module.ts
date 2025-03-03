import { Module } from '@nestjs/common';
import { InteractiveService } from './interactive.service';
import { InteractiveController } from './interactive.controller';
import { StrapiService } from 'src/strapi/strapi.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [InteractiveController],
  providers: [InteractiveService, StrapiService],
})
export class InteractiveModule {}
