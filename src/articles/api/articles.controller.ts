import { Controller, Get, Body, Patch, Param, Delete } from '@nestjs/common';
import { ArticlesService } from '../articles.service';
import { UpdateArticleDto } from './dto/requests/update-article.dto';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ArticleDto } from './dto/responses/article.dto';

@Controller('articles')
@ApiTags('articles')
export class ArticlesController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Get()
  @ApiOkResponse({ isArray: true, type: ArticleDto })
  findAll() {
    return this.articlesService.findAll();
  }

  @Get('drafts')
  @ApiOkResponse({ isArray: true, type: ArticleDto })
  findDrafts() {
    return this.articlesService.findDrafts();
  }

  @Get(':id')
  @ApiOkResponse({ type: ArticleDto })
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ArticleDto })
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: ArticleDto })
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
