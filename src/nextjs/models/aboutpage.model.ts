import { StrapiService } from 'src/strapi/strapi.service';

export class AboutUsPage {
  private strapiService = null;

  constructor(
    strapiService: StrapiService,
  ) {
    this.strapiService = strapiService;
  }

  async get() {
    const data = await this.strapiService.getAboutUs();
    return data;
  }
}
