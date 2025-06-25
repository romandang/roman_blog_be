import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { GeneralModule } from './general/general.module';
import { InteractiveModule } from './interactive/interactive.module';
import { NextjsModule } from './nextjs/nextjs.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    ArticleModule,
    CategoryModule,
    InteractiveModule,
    NextjsModule,
    GeneralModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
