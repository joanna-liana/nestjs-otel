import { Article as PrismaArticle } from '@prisma/client';
import { Article, ArticleProps } from './Article';

export class ArticleMapper {
  static fromPersistence(props: PrismaArticle) {
    return new Article(props);
  }

  static fromDto(props: ArticleProps) {
    return new Article(props);
  }
}
