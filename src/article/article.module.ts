import { Module } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { StrapiService } from 'src/strapi/strapi.service';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [ConfigModule],
  controllers: [ArticleController],
  providers: [ArticleService, StrapiService],
})
export class ArticleModule {}
