import { Injectable } from '@nestjs/common';
import { StrapiService } from 'src/strapi/strapi.service';

@Injectable()
export class GeneralService { 
  constructor(private strapiService: StrapiService) {}

  async getFooter() {
    try {
      const response = await this.strapiService.getFooter();
      return response;
    } catch (error) {
      throw error;
    }
  }
}
