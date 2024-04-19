import { Module } from '@nestjs/common';
import { InteractiveService } from './interactive.service';
import { InteractiveController } from './interactive.controller';
import { StrapiService } from 'src/strapi/strapi.service';

@Module({
  controllers: [InteractiveController],
  providers: [InteractiveService, StrapiService],
})
export class InteractiveModule {}
