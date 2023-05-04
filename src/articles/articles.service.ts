import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDraftDto } from './api/dto/requests/create-draft.dto';
import { UpdateArticleDto } from './api/dto/requests/update-article.dto';
import { PrismaService } from '../prisma/prisma.service';
import { ArticleMapper } from './domain/ArticleMapper';
import { Article } from './domain/Article';

@Injectable()
export class ArticlesService {
  constructor(private readonly prisma: PrismaService) {}

  async addDraft(createDraftDto: CreateDraftDto) {
    const draft = Article.createDraft(createDraftDto);

    const createdDraft = await this.prisma.article.create({
      data: draft.props,
    });

    return ArticleMapper.fromPersistence(createdDraft);
  }

  async publish(draftId: number) {
    const draftInDb = await this.prisma.article.findUnique({
      where: { id: draftId },
    });

    if (!draftInDb) {
      throw new NotFoundException({ draftId });
    }

    const draft = ArticleMapper.fromPersistence(draftInDb);

    draft.publish();

    const publishedDraft = await this.prisma.article.update({
      where: { id: draftId },
      data: draft.props,
    });

    return ArticleMapper.fromPersistence(publishedDraft);
  }

  findAll() {
    return this.prisma.article.findMany({ where: { published: true } });
  }

  findDrafts() {
    return this.prisma.article.findMany({ where: { published: false } });
  }

  async findOneArticle(id: number) {
    const article = await this.prisma.article.findFirst({
      where: { id, published: true },
    });

    if (!article) {
      throw new NotFoundException();
    }

    return ArticleMapper.fromPersistence(article);
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.article.update({
      where: { id },
      data: updateArticleDto,
    });
  }

  remove(id: number) {
    return this.prisma.article.delete({ where: { id } });
  }
}
