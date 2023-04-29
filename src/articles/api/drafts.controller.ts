import { Controller, Post, Body, Param } from '@nestjs/common';
import { ArticlesService } from '../articles.service';
import { CreateDraftDto } from './dto/requests/create-draft.dto';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { DraftDto } from './dto/responses/data/draft.dto';
import { ArticleDto } from './dto/responses/data/article.dto';
import { CreateDraftResponseDto } from './dto/responses/createDraftResponseDto';
import { PublishDraftResponseDto } from 'src/articles/api/dto/responses/publishDraftResponseDto';
import { HttpMethod } from 'src/articles/api/HttpMethod';

@Controller('drafts')
@ApiTags('drafts')
export class DraftsController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  @ApiCreatedResponse({ type: CreateDraftResponseDto })
  async create(
    @Body() createDraftDto: CreateDraftDto,
  ): Promise<CreateDraftResponseDto> {
    const createdDraft = await this.articlesService.addDraft(createDraftDto);

    const draftId = createdDraft.props.id;

    return {
      data: DraftDto.from(createdDraft),
      _links: {
        self: {
          href: `/drafts/${draftId}`,
        },
        all: {
          href: '/drafts/',
        },
        ...(createdDraft.canBePublished && {
          publish: {
            href: `/drafts/${draftId}/publish`,
            method: HttpMethod.POST,
          },
        }),
      },
    };
  }

  @Post('/:draftId/publish')
  @ApiCreatedResponse({ type: PublishDraftResponseDto })
  async publish(
    @Param('draftId') draftId: number,
  ): Promise<PublishDraftResponseDto> {
    const publishedArticle = await this.articlesService.publish(+draftId);

    return {
      data: ArticleDto.from(publishedArticle),
      _links: {
        self: {
          href: `/articles/${draftId}`,
        },
        all: {
          href: '/articles/',
        },
      },
    };
  }
}
