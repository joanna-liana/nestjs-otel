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
    const draft = await this.findOne(draftId);

    if (!draft) {
      throw new NotFoundException({ draftId });
    }

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

  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({ where: { id } });

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
