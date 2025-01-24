export class Category {
  id: string;
  imageUrl: string;
  categoryName: string;
  categoryUrl: string;

  constructor(partial: Partial<Category>) {
    Object.assign(this, partial);
  }
}
