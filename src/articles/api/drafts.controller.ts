import { Controller, Post, Body, Param } from '@nestjs/common';
import { ArticlesService } from '../articles.service';
import { CreateDraftDto } from './dto/requests/create-draft.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DraftDto } from './dto/responses/draft.dto';
import { ArticleDto } from './dto/responses/article.dto';

@Controller('drafts')
@ApiTags('drafts')
export class DraftsController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: DraftDto })
  async create(@Body() createDraftDto: CreateDraftDto) {
    const createdDraft = await this.articlesService.addDraft(createDraftDto);

    const draftId = createdDraft.props.id;

    return {
      data: DraftDto.from(createdDraft),
      _links: {
        self: `/drafts/${draftId}`,
        all: '/drafts/',
        ...(createdDraft.canBePublished && {
          publish: `/drafts/${draftId}/publish`,
        }),
      },
    };
  }

  @Post('/:draftId/publish')
  @ApiCreatedResponse({ type: ArticleDto })
  async publish(@Param() draftId: number) {
    const publishedArticle = await this.articlesService.publish(draftId);

    return {
      data: ArticleDto.from(publishedArticle),
      _links: {
        self: `/articles/${draftId}`,
        all: '/articles/',
      },
    };
  }
}
