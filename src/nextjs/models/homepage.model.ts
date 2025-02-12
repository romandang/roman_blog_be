import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';
import { ArticleService } from 'src/article/article.service';
import { Article } from 'src/article/entities/article.entity';
import { CategoryService } from 'src/category/category.service';
import { _, pickFieldsOnArrayObject, returnEmptyData } from 'utils/helpers';

export class Homepage {
  private CMS_URL = '';
  private articleService = null;
  private categoryService = null;

  constructor(
    articleService: ArticleService,
    categoryService: CategoryService,
    configService: ConfigService,
  ) {
    this.CMS_URL = configService.get<string>('CMS_URL');
    this.CMS_URL = this.CMS_URL.replace('/api', '');
    this.articleService = articleService;
    this.categoryService = categoryService;
  }

  async _getDataMainFeatured(): Promise<{
    heroArticle: Array<Article>;
    subArticle: Array<Article>;
  }> {
    const articleData = await this.articleService.getAllArticle({
      sort_by: 'most_interactive',
      page: 1,
      items_per_page: 6,
    });

    if (_.isEmpty(articleData))
      return {
        heroArticle: [],
        subArticle: [],
      };

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
      const datePublished = moment(publishedAt).format('MMMM D, YYYY');
      const pathAlias = slug ?? '/';
      return {
        imageUrl,
        categoryName,
        categoryUrl,
        datePublished,
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

    return { heroArticle, subArticle };
  }

  async _getDataTrending() {
    const listCategory = await this.categoryService.getAllCategory();
    if (_.isEmpty(listCategory)) return [];

    const convertData = (category) => {
      const { thumbnail, slug, name, id } = category;

      const imageUrl = thumbnail?.url
        ? `${this.CMS_URL}${String(thumbnail?.url)}`
        : 'https://picsum.photos/1170/835';
      const categoryName = name ?? 'Default';
      const categoryUrl = slug ?? '/';

      return {
        id,
        imageUrl,
        categoryName,
        categoryUrl,
      };
    };

    const data = listCategory.map((category) => convertData(category));

    return data;
  }

  _convertData = (article) => {
    const {
      thumbnail,
      categoryId,
      publishedAt,
      title = 'Missing title',
      slug,
      author,
      shortDescription,
    } = article;

    const imageUrl = thumbnail?.url
      ? `${this.CMS_URL}${String(thumbnail?.url)}`
      : 'https://picsum.photos/1170/835';
    const categoryName = categoryId?.name ?? 'Default';
    const categoryUrl = categoryId?.slug ?? '/';
    const datePublished = moment(publishedAt).format('MMMM D, YYYY');
    const pathAlias = slug ?? '/';
    const authorUrl = author?.id ? `/${author?.id}` : '';
    const authorName = author?.authorName ?? `Admin`;
    const authorAvarta = author?.avatar?.url
      ? `${this.CMS_URL}${String(author?.avatar?.url)}`
      : 'https://picsum.photos/1170/835';
    const createdDate = moment(publishedAt).fromNow();

    return {
      imageUrl,
      categoryName,
      categoryUrl,
      datePublished,
      title,
      pathAlias,
      authorUrl,
      authorName,
      authorAvarta,
      createdDate,
      description: shortDescription,
    };
  };

  async _getDataArticles(): Promise<{
    populars: Array<Article>;
    recents: Array<Article>;
    galerys: Array<Article>;
  }> {
    const popularsData = await this.articleService.getAllArticle({
      sort_by: 'popular',
      page: 1,
      items_per_page: 6,
    });

    const recentsData = await this.articleService.getAllArticle({
      sort_by: 'recently',
      page: 1,
      items_per_page: 5,
    });

    //TODO
    const galerysData = [];

    const populars = returnEmptyData(
      pickFieldsOnArrayObject(
        popularsData?.map((item) => this._convertData(item)),
        ['imageUrl', 'url', 'title', 'datePublished'],
      ),
    );

    const recents = returnEmptyData(
      recentsData?.map((item) => this._convertData(item)),
    );
    const galerys = returnEmptyData(
      galerysData?.map((item) => this._convertData(item)),
    );

    return { populars, recents, galerys };
  }

  async _getDataEditorPicked(): Promise<{
    carousels: Array<Article>;
    relevantArticles: Array<Article>;
  }> {
    const editorPickedData = await this.articleService.getAllArticle({
      sort_by: 'editor_picked',
      page: 1,
      items_per_page: 6,
    });

    if (_.isEmpty(editorPickedData))
      return {
        carousels: [],
        relevantArticles: [],
      };

    const carousels = _.orderBy(
      editorPickedData.filter(
        (article) => article?.editorPicked?.isCarousel === true,
      ),
      ['priority'],
      'asc',
    );
    const relevantArticles = _.orderBy(
      editorPickedData.filter(
        (article) => article?.editorPicked?.isCarousel === false,
      ),
      ['priority'],
      'asc',
    );

    return {
      carousels: returnEmptyData(
        pickFieldsOnArrayObject(
          carousels?.map((item) => this._convertData(item)),
          [
            'categoryUrl',
            'categoryName',
            'createdDate',
            'title',
            'url',
            'description',
            'imageUrl',
          ],
        ),
      ),
      relevantArticles: returnEmptyData(
        pickFieldsOnArrayObject(
          relevantArticles?.map((item) => this._convertData(item)),
          ['imageUrl', 'title', 'datePublished', 'url'],
        ),
      ),
    };
  }

  async get() {
    const { heroArticle, subArticle } = await this._getDataMainFeatured();
    const trending = await this._getDataTrending();
    const { populars, recents, galerys } = await this._getDataArticles();
    const { carousels, relevantArticles } = await this._getDataEditorPicked();

    const data = {
      mainFeatured: {
        heroArticle,
        subArticle,
      },
      trending,
      adbanner: [],
      recentArticles: {
        populars,
        recents,
        galerys,
      },
      editorPicked: {
        carousels,
        relevantArticles,
      },
      // interesting: [
      //   {
      //     imageUrl: 'https://picsum.photos/540/320',
      //     categoryUrl: 'category.html',
      //     categoryName: 'Lifestyle',
      //     postedBy: '27 August',
      //     title:
      //       '  After a Few Dates, They Traveled to the Other Side of the World',
      //     authorName: 'Kate Adie',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     timeReading: '6 mins to read',
      //   },
      //   {
      //     imageUrl: 'https://picsum.photos/540/320',
      //     categoryUrl: 'category.html',
      //     categoryName: 'Healthy',
      //     postedBy: '28 August',
      //     title: "  Jessamyn Stanley's 5-Minute Yoga for Beginners",
      //     authorName: 'Kate Adie',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     timeReading: '6 mins to read',
      //   },
      //   {
      //     imageUrl: 'https://picsum.photos/540/320',
      //     categoryUrl: 'category.html',
      //     categoryName: 'Food',
      //     postedBy: '02 September',
      //     title: '  How an MS Diagnosis Changed My Relationship With Food',
      //     authorName: 'Kate Adie',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     timeReading: '6 mins to read',
      //   },
      //   {
      //     imageUrl: 'https://picsum.photos/540/320',
      //     categoryUrl: 'category.html',
      //     categoryName: ' Travel Tips',
      //     postedBy: '05 September',
      //     title: '  Where to Score the Best Travel Deals on Cyber Monday',
      //     authorName: 'Kate Adie',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     timeReading: '6 mins to read',
      //   },
      // ],
      // instagramFeatured: [
      //   {
      //     imageUrl: 'https://picsum.photos/290/207',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     authorName: 'Kate Adie',
      //     postedBy: '3 minutes ago',
      //   },
      //   {
      //     imageUrl: 'https://picsum.photos/290/207',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     authorName: 'Kate Adie',
      //     postedBy: '3 minutes ago',
      //   },
      //   {
      //     imageUrl: 'https://picsum.photos/290/207',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     authorName: 'Kate Adie',
      //     postedBy: '3 minutes ago',
      //   },
      //   {
      //     imageUrl: 'https://picsum.photos/290/207',
      //     authorAvarta: 'https://picsum.photos/32/32',
      //     authorName: 'Kate Adie',
      //     postedBy: '3 minutes ago',
      //   },
      // ],
    };

    return data;
  }
}
