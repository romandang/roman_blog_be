import { Module } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';
import { GeneralController } from './general.controller';
import { GeneralService } from './general.service';

@Module({
  controllers: [GeneralController],
  providers: [GeneralService, StrapiService],
})
export class GeneralModule {}
