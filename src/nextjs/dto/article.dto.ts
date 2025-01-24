export class Article {
  imageUrl: string;
  categoryName: string;
  categoryUrl: string;
  datePublished: string;
  title: string;
  pathAlias: string;

  constructor(partial: Partial<Article>) {
    Object.assign(this, partial);
  }
}
