import { Injectable } from '@nestjs/common';
import { CreateNextjDto } from './dto/create-nextj.dto';
import { UpdateNextjDto } from './dto/update-nextj.dto';
import { ArticleService } from 'src/article/article.service';
import { _ } from 'utils/helpers';
import * as moment from 'moment';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NextjsService {
  private CMS_URL = '';

  constructor(
    private readonly articleService: ArticleService,
    private readonly configService: ConfigService,
  ) {
    this.CMS_URL = this.configService.get<string>('CMS_URL');
    this.CMS_URL = this.CMS_URL.replace('/api', '');
  }

  async getDataHomepage() {
    const articleData = await this.articleService.getAllArticle({
      sort_by: 'most_interactive',
      page: 1,
      items_per_page: 6,
    });

    if (_.isEmpty(articleData)) return [];

    const convertData = (article) => {
      const {
        thumbnail,
        categoryId,
        publishedAt,
        title = 'Missing title',
        slug,
      } = article;

      const imageUrl = thumbnail?.url
        ? `${this.CMS_URL}${String(thumbnail?.url)}`
        : 'https://picsum.photos/1170/835';
      const categoryName = categoryId?.name ?? 'Default';
      const categoryUrl = categoryId?.slug ?? '/';
      const datePublic = moment(publishedAt).format('MMMM D, YYYY');
      const pathAlias = slug ?? '/';
      return {
        imageUrl,
        categoryName,
        categoryUrl,
        datePublic,
        title,
        pathAlias,
      };
    };
    const heroArticle = _.take(articleData, 2).map((article) =>
      convertData(article),
    );

    const subArticle =
      _.size(articleData) > 2
        ? _.slice(articleData, 2, _.size(articleData)).map((article) =>
            convertData(article),
          )
        : [];

    const data = {
      response: {
        data: {
          mainFeatured: {
            heroArticle,
            subArticle,
          },
          trending: [
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Travel',
              categoryUrl: '/travel',
            },
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Lifestyle',
              categoryUrl: '/travel',
            },
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Animal',
              categoryUrl: '/travel',
            },
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Health',
              categoryUrl: '/travel',
            },
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Food',
              categoryUrl: '/travel',
            },
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Sport',
              categoryUrl: '/travel',
            },
            {
              imageUrl: 'https://picsum.photos/133/160',
              categoryName: 'Home Decor',
              categoryUrl: '/travel',
            },
          ],
          adbanner: [],
          articles: {
            populars: [
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title:
                  ' 9 Things I Love About Shaving My Head During Quarantine',
                datePublished: 'September 15, 2021',
              },
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title: 'Where to Score the Best Travel Deals on Cyber Monday',
                datePublished: 'November 12, 2021',
              },
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title:
                  '5 Kinds of Food-Shamers You Will Encounter (and How to Deal)',
                datePublished: 'April 10, 2021',
              },
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title:
                  '12 Best Books to Read at the Beach (or Anywhere) This Summer',
                datePublished: 'June 15, 2021',
              },
            ],
            recents: [
              {
                imageUrl: 'https://picsum.photos/500/500',
                url: 'single.html',
                categoryName: 'Fashion',
                categoryUrl: 'category.html',
                title: 'Beachmaster Elephant Seal Fights achmaster Elephant',
                authorUrl: 'page-author.html',
                authorName: 'Kate Adie',
                authorAvarta: 'https://picsum.photos/32/32',
                createdDate: '5 minutes ago',
              },
              {
                imageUrl: 'https://picsum.photos/500/500',
                url: 'single.html',
                categoryName: 'Travel',
                categoryUrl: 'category.html',
                title:
                  'After a Few Dates, They Traveled to the Other Side of the World',
                authorUrl: 'page-author.html',
                authorName: 'Aten Joun',
                authorAvarta: 'https://picsum.photos/32/32',
                createdDate: '12 minutes ago',
              },
              {
                imageUrl: 'https://picsum.photos/500/500',
                url: 'single.html',
                categoryName: 'Health',
                categoryUrl: 'category.html',
                title: "Jessamyn Stanley's 5-Minute Yoga for Beginners",
                authorUrl: 'page-author.html',
                authorName: 'J. Anna',
                authorAvarta: 'https://picsum.photos/32/32',
                createdDate: '3 days ago',
              },
              {
                imageUrl: 'https://picsum.photos/500/500',
                url: 'single.html',
                categoryName: 'Kitchen',
                categoryUrl: 'category.html',
                title: 'How an MS Diagnosis Changed My Relationship With Food',
                authorUrl: 'page-author.html',
                authorName: 'Kasumi',
                authorAvarta: 'https://picsum.photos/32/32',
                createdDate: 'September 19, 2021',
              },
            ],
            galerys: [
              {
                url: '/imgs/thumbnail-3.jpg',
                imageUrl: 'https://picsum.photos/500/500',
              },
              {
                url: '/imgs/thumbnail-3.jpg',
                imageUrl: 'https://picsum.photos/500/500',
              },
              {
                url: '/imgs/thumbnail-3.jpg',
                imageUrl: 'https://picsum.photos/500/500',
              },
              {
                url: '/imgs/thumbnail-3.jpg',
                imageUrl: 'https://picsum.photos/500/500',
              },
              {
                url: '/imgs/thumbnail-3.jpg',
                imageUrl: 'https://picsum.photos/500/500',
              },
              {
                url: '/imgs/thumbnail-3.jpg',
                imageUrl: 'https://picsum.photos/500/500',
              },
            ],
          },
          editorPicked: {
            carousels: [
              {
                categoryUrl: 'category.html',
                categoryName: 'Lifestyle',
                createdDate: 'September 15, 2021',
                title: 'The 28 Best Skincare Products of 2021',
                url: 'single.html',
                description:
                  'Tempus ultricies augue luctus et ut suscipit. Morbi arcu, ultrices purus dolor erat bibendum sapien metus. Sit mi, pharetra, morbi arcu id. Pellentesque dapibus nibh augue senectus. Ad pri docendi aliquando, per an minim novum fuisset, eam doctus accumsan ad. Id veritus tibique per',
                imageUrl: 'https://picsum.photos/474/517',
              },
              {
                categoryUrl: 'category.html',
                categoryName: 'Beauty',
                createdDate: ' September 15, 2021',
                title: 'Rice Water for Hair Growth: Does It Actually Work?',
                url: 'single.html',
                description:
                  'Qualisque persecuti eu vis. Et his eruditi fastidii gloriatur. In nec aliquam lobortis definitionem, aeterno qualisque appellantur ea sea',
                imageUrl: 'https://picsum.photos/474/517',
              },
              {
                categoryUrl: 'category.html',
                categoryName: 'Music',
                createdDate: 'September 15, 2021',
                title: '5 Science-Backed Reasons Why Music is Good for You',
                url: 'single.html',
                description:
                  ' An vis natum detracto nominati, ei mundi animal definitionem his, saepe indoctum pericula an sea. Vix ut admodum nostrum fastidii.',
                imageUrl: 'https://picsum.photos/474/517',
              },
            ],
            relevantArticles: [
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title:
                  '12 Best Books to Read at the Beach (or Anywhere) This Summer',
                datePublished: 'September 15, 2021',
              },
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title:
                  '9 Things I Love About Shaving My Head During Quarantine',
                datePublished: 'September 15, 2021',
              },
              {
                imageUrl: 'https://picsum.photos/112/112',
                url: 'single.html',
                title: 'Rice Water for Hair Growth: Does It Actually Work?',
                datePublished: 'January 14, 2021',
              },
            ],
          },
          interesting: [
            {
              imageUrl: 'https://picsum.photos/540/320',
              categoryUrl: 'category.html',
              categoryName: 'Lifestyle',
              postedBy: '27 August',
              title:
                '  After a Few Dates, They Traveled to the Other Side of the World',
              authorName: 'Kate Adie',
              authorAvarta: 'https://picsum.photos/32/32',
              timeReading: '6 mins to read',
            },
            {
              imageUrl: 'https://picsum.photos/540/320',
              categoryUrl: 'category.html',
              categoryName: 'Healthy',
              postedBy: '28 August',
              title: "  Jessamyn Stanley's 5-Minute Yoga for Beginners",
              authorName: 'Kate Adie',
              authorAvarta: 'https://picsum.photos/32/32',
              timeReading: '6 mins to read',
            },
            {
              imageUrl: 'https://picsum.photos/540/320',
              categoryUrl: 'category.html',
              categoryName: 'Food',
              postedBy: '02 September',
              title: '  How an MS Diagnosis Changed My Relationship With Food',
              authorName: 'Kate Adie',
              authorAvarta: 'https://picsum.photos/32/32',
              timeReading: '6 mins to read',
            },
            {
              imageUrl: 'https://picsum.photos/540/320',
              categoryUrl: 'category.html',
              categoryName: ' Travel Tips',
              postedBy: '05 September',
              title: '  Where to Score the Best Travel Deals on Cyber Monday',
              authorName: 'Kate Adie',
              authorAvarta: 'https://picsum.photos/32/32',
              timeReading: '6 mins to read',
            },
          ],
          instagramFeatured: [
            {
              imageUrl: 'https://picsum.photos/290/207',
              authorAvarta: 'https://picsum.photos/32/32',
              authorName: 'Kate Adie',
              postedBy: '3 minutes ago',
            },
            {
              imageUrl: 'https://picsum.photos/290/207',
              authorAvarta: 'https://picsum.photos/32/32',
              authorName: 'Kate Adie',
              postedBy: '3 minutes ago',
            },
            {
              imageUrl: 'https://picsum.photos/290/207',
              authorAvarta: 'https://picsum.photos/32/32',
              authorName: 'Kate Adie',
              postedBy: '3 minutes ago',
            },
            {
              imageUrl: 'https://picsum.photos/290/207',
              authorAvarta: 'https://picsum.photos/32/32',
              authorName: 'Kate Adie',
              postedBy: '3 minutes ago',
            },
          ],
        },
      },
    };

    return data;
  }

  findAll() {
    return `This action returns all nextjs`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nextj`;
  }

  update(id: number, updateNextjDto: UpdateNextjDto) {
    return `This action updates a #${id} nextj`;
  }

  remove(id: number) {
    return `This action removes a #${id} nextj`;
  }
}
