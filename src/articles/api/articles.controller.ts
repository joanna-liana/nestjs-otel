import { Controller, Param, Get } from '@nestjs/common';
import { ArticlesService } from '../articles.service';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from './dto/responses/data/article.dto';
import { SingleArticleResponseDto } from './dto/responses/singleArticleResponseDto';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get('/:articleId')
  @ApiOkResponse({ type: SingleArticleResponseDto })
  async getOne(
    @Param('articleId') articleId: number,
  ): Promise<SingleArticleResponseDto> {
    const article = await this.articlesService.findOneArticle(+articleId);

    return {
      data: ArticleDto.from(article),
      _links: {
        self: {
          href: `/articles/${articleId}`,
        },
        all: {
          href: '/articles/',
        },
      },
    };
  }
}
